// Initialize variables to store the Spotify track URL and URL parts
let spotifyTrackUrl = '';
let urlParts = '';

// Wait for the DOM to be fully loaded before executing the script
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

// Populate user interface with Spotify user information
populateUI(JSON.parse(localStorage.getItem("spotifyInfo")));

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

// Refresh the iframe by fetching the current song and updating the iframe source
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

// Asynchronously fetch the current song data from the Spotify API
async function fetchCurrentSong(token) {
  const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });

  return result.json();
}

// Function to initiate the implicit authorization flow for Spotify API
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
