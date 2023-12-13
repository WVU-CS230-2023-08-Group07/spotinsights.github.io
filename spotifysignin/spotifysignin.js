/**
 * @file SpotifyAuthentication.js
 * @brief JavaScript code for Spotify authentication and data retrieval using the Authorization Code Flow and Spotify Web API.
 */

// Declare a variable to store the current song
let song;

/**
 * @brief Event listener that executes when the DOM has fully loaded.
 */
document.addEventListener('DOMContentLoaded', function() {
  // Hide the authorize button
  document.getElementById("authorizeButton").style.display = "none";

  // Spotify API client ID
  const clientId = "1a9863d157de4ba9aff6cfec18843f5b";

  // Extract the authorization code from the URL parameters
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  // Check if the authorization code is present
  if (!code) {
    // If no code is present, redirect to Spotify authorization page
    redirectToAuthCodeFlow(clientId);
  } else {
    // If code is present, exchange it for an access token
    getAccessToken(clientId, code)
      .then(token => {
        // Store the access token in local storage
        localStorage.setItem("accessToken", token);
        // Fetch user profile using the access token
        return fetchProfile(token);
      })
      .then(profile => {
        // Populate the UI with user profile information
        populateUI(profile);
      })
      .catch(error => console.error(error));
  }
});

/**
 * @brief Redirects to Spotify Authorization Code Flow.
 * @param clientId - Spotify API client ID.
 */
export async function redirectToAuthCodeFlow(clientId) {
  // Generate a code verifier and challenge for PKCE
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  // Store the verifier in local storage
  localStorage.setItem("verifier", verifier);

  // Construct the authorization URL with parameters
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "https://wvu-cs230-2023-08-group07.github.io/spotinsights.github.io/spotifysignin/");
  params.append("scope", "user-read-private user-read-email user-read-currently-playing user-read-playback-state");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  // Redirect to the Spotify authorization URL
  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

/**
 * @brief Generates a random code verifier for PKCE.
 * @param length - Length of the code verifier.
 * @return The generated code verifier.
 */
function generateCodeVerifier(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * @brief Generates the code challenge for PKCE.
 * @param codeVerifier - The code verifier for which the challenge is generated.
 * @return The generated code challenge.
 */
async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * @brief Exchanges authorization code for an access token.
 * @param clientId - Spotify API client ID.
 * @param code - Authorization code.
 * @return The access token.
 */
export async function getAccessToken(clientId, code) {
  // Retrieve the code verifier from local storage
  const verifier = localStorage.getItem("verifier");

  // Construct the parameters for token exchange
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "https://wvu-cs230-2023-08-group07.github.io/spotinsights.github.io/spotifysignin/");
  params.append("code_verifier", verifier);

  // Make a POST request to exchange code for access token
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });

  // Extract and return the access token from the response
  const { access_token } = await result.json();
  return access_token;
}

/**
 * @brief Fetches user profile using the access token.
 * @param token - Access token.
 * @return User profile data.
 */
async function fetchProfile(token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  // Return the user profile data
  return await result.json();
}

/**
 * @brief Fetches the currently playing song using the access token.
 * @param token - Access token.
 * @return Currently playing song data.
 */
async function fetchCurrentSong(token) {
  const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });
  
  // Return the currently playing song data
  return result.json();
}

/**
 * @brief Populates the UI with user profile and current song information.
 * @param profile - User profile data.
 */
async function populateUI(profile) {
  // Store user profile information in local storage
  localStorage.setItem("spotifyInfo", JSON.stringify(profile));

  // Fetch the currently playing song
  await fetchCurrentSong(localStorage.getItem("accessToken"))
    .then(currentSongData => {
      // Store the current song data
      song = currentSongData;
      // Store the URL of the currently playing song in local storage
      localStorage.setItem("songURL", song.item.external_urls.spotify);
      // Log the URL to the console
      console.log(localStorage.getItem("songURL"));
    })
    .catch(error => {
      console.error(error);
    });

  // Redirect to the callback page
  window.location.href = 'callback/';
}
