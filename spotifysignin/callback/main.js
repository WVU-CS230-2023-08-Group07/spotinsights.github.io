/**
 * @file This script interacts with the Spotify API to embed a Spotify track in a webpage and display user information.
 */

// Initialize variables to store the Spotify track URL and URL parts
let spotifyTrackUrl = '';
let urlParts = '';

/**
 * @brief Event listener for when the DOM is fully loaded.
 * @details Logs Spotify information and song URL stored in local storage, constructs an iframe to embed the Spotify track, and populates user interface.
 * @param {Event} event - The DOMContentLoaded event.
 */
document.addEventListener('DOMContentLoaded', function() {
  // Log Spotify information and song URL stored in local storage
  console.log(localStorage.getItem("spotifyInfo"));
  console.log(localStorage.getItem("songURL"));

  // Retrieve the song URL from local storage and split it into parts
  var urlParts = localStorage.getItem("songURL").split('/');

  // Construct the Spotify track URL using the song ID from the URL parts
  var spotifyTrackUrl = "https://open.spotify.com/embed/track/" + urlParts[4];

  // Create an iframe element for embedding the Spotify track
  const iframe = document.createElement('iframe');
  iframe.style.borderRadius = '12px';
  iframe.src = spotifyTrackUrl;
  iframe.width = '25%';
  iframe.height = '352';
  iframe.frameBorder = '0';
  iframe.allowFullscreen = true;
  iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
  iframe.loading = 'lazy';

  // Append the iframe to the container with the id 'spotifyEmbed'
  const spotifyEmbedContainer = document.getElementById('spotifyEmbed');
  spotifyEmbedContainer.appendChild(iframe);

  // Call the refreshIframe function to update the iframe
  refreshIframe();
});

/**
 * @brief Populates the user interface with Spotify user information.
 * @param {Object} profile - The Spotify user profile information.
 */
populateUI(JSON.parse(localStorage.getItem("spotifyInfo")));

/**
 * @brief Populates various elements in the UI with Spotify user information.
 * @param {Object} profile - The Spotify user profile information.
 */
function populateUI(profile) {
  // Set various elements in the UI with Spotify user information
  document.getElementById("displayName").innerText = profile.display_name;
  if (profile.images[0]) {
    const profileImage = new Image(200, 200);
    profileImage.src = profile.images[1].url;
    document.getElementById("avatar").appendChild(profileImage);
    document.getElementById("imgUrl").innerText = profile.images[0].url;
  }
  document.getElementById("id").innerText = profile.id;
  document.getElementById("email").innerText = profile.email;
  document.getElementById("uri").innerText = profile.uri;
  document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
  document.getElementById("url").innerText = profile.href;
  document.getElementById("url").setAttribute("href", profile.href);
}

/**
 * @brief Refreshes the iframe by fetching the current song and updating the iframe source.
 */
function refreshIframe() {
  const iframe = document.getElementById('spotifyEmbed');

  // Fetch the current song data using the Spotify access token
  fetchCurrentSong(localStorage.getItem("accessToken"))
    .then(currentSongData => {
      var song = currentSongData;
      localStorage.setItem("songURL", song.item.external_urls.spotify);
    })
    .catch(error => {
      console.error(error);
    });

  // Split the updated song URL into parts and construct the new Spotify track URL
  var urlParts = localStorage.getItem("songURL").split('/');
  spotifyTrackUrl = "https://open.spotify.com/embed/track/" + urlParts[4];

  // Update the iframe source
  iframe.src = iframe.src;
}

/**
 * @brief Asynchronously fetches the current song data from the Spotify API.
 * @param {string} token - The Spotify access token.
 * @return {Promise<Object>} A promise that resolves to the current song data.
 */
async function fetchCurrentSong(token) {
  const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });

  return result.json();
}

/**
 * @brief Initiates the implicit authorization flow for Spotify API.
 * @details Extracts the client ID from the user profile, generates a random string as the state parameter for security, and constructs the authorization URL.
 */
async function implicitFlow() {
  // Extract the client ID from the user profile
  var client_id = profile.id;
  var redirect_uri = 'playlists.html'; // Define the redirect URI

  // Generate a random string as the state parameter for security
  var state = generateRandomString(16);

  // Store the state in local storage
  localStorage.setItem(stateKey, state);

  // Define the scope of the authorization
  var scope = 'user-read-private user-read-email';

  // Construct the authorization URL
  var url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&state=' + encodeURIComponent(state);
}
