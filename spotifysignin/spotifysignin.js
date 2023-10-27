let accessToken; // Declare a variable to store the access token
let song;

// Event listener for when the document is ready
document.addEventListener('DOMContentLoaded', function () {
  // Hide the authorize button
  document.getElementById("authorizeButton").style.display = "none";

  const clientId = "1a9863d157de4ba9aff6cfec18843f5b";
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  // Retrieve access token from a cookie
  accessToken = getCookie("accessToken");
  console.log(accessToken);

  // Redirect to the callback page if an access token is present
  if (accessToken !== "NaN") {
    window.location.href = 'callback/';
  }

  // If no authorization code is present, redirect to the Spotify authorization flow
  if (!code) {
    redirectToAuthCodeFlow(clientId);
  } else {
    // Get the access token and fetch user profile
    getAccessToken(clientId, code)
      .then(token => {
        accessToken = token;
        return fetchProfile(token);
      })
      .then(profile => {
        populateUI(profile);
      })
      .catch(error => console.error(error));
  }
});

// Function to redirect to the Spotify Authorization Code Flow
export async function redirectToAuthCodeFlow(clientId) {
  // Generate code verifier and challenge
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "https://wvu-cs230-2023-08-group07.github.io/spotinsights.github.io/spotifysignin/");
  params.append("scope", "user-read-private user-read-email user-read-currently-playing user-read-playback-state");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  // Redirect to the Spotify authorization page
  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

// Function to generate a random code verifier
function generateCodeVerifier(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Function to generate a code challenge
async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Function to get the access token from the authorization code
export async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "https://wvu-cs230-2023-08-group07.github.io/spotinsights.github.io/spotifysignin/");
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });

  const { access_token } = await result.json();
  return access_token;
}

// Function to fetch the user's Spotify profile
async function fetchProfile(token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}

// Function to fetch the user's current song
async function fetchCurrentSong(token) {
  const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });

  return result.json();
}

// Function to set a cookie with a given name, value, and expiration days
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to get a cookie value by name
function getCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) == 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

// Function to populate the UI with user profile data and update cookies
function populateUI(profile) {
  var jsonString = JSON.stringify(profile);
  setCookie("result", jsonString, 365);
  setCookie("accessToken", accessToken, 365);

  fetchCurrentSong(accessToken)
    .then(currentSongData => {
      song = currentSongData;
      var songURL = song.item.external_urls.spotify;
      var songDuration = Number(song.item.duration_ms);
      var songProgess = Number(song.progress_ms);
      var timeRemaining_ms = songDuration - songProgess;
      setCookie("songURL", songURL, 365);
      setCookie("timeRemaining_ms", timeRemaining_ms, 365);
    })
    .catch(error => {
      console.error(error);
    });

  // Redirect to the callback page
  window.location.href = 'callback/';
}
