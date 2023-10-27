// Retrieve data from cookies
var result = getCookie("result");
var currSong = getCookie("songURL");
var accessToken = getCookie("accessToken");

// Display song information in the console
console.log(currSong);
console.log(result);

// Create the Spotify track URL
var urlParts = currSong.split("/");
var spotifyTrackUrl = "https://open.spotify.com/embed/track/" + urlParts[4];

// Create and configure the iframe for Spotify embed
const iframe = document.createElement('iframe');
iframe.style.borderRadius = '12px';
iframe.src = spotifyTrackUrl;
iframe.width = '15%';
iframe.height = '352';
iframe.frameBorder = '0';
iframe.allowFullscreen = true;
iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
iframe.loading = 'lazy';

// Add the iframe to the HTML page
const spotifyEmbedContainer = document.getElementById('spotifyEmbed');
spotifyEmbedContainer.appendChild(iframe);

// Refresh the iframe content
refreshIframe();

// Populate the user interface with Spotify user profile data
populateUI(JSON.parse(result));

// Function to populate the UI with user profile data
function populateUI(profile) {
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

// Function to retrieve a cookie value by name
function getCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length);
    }
  }
  return null;
}

// Function to refresh the iframe content
function refreshIframe() {
  const iframe = document.getElementById('spotifyEmbed');
  fetchCurrentSong(accessToken)
    .then(currentSongData => {
      const song = currentSongData;
      const songURL = song.item.external_urls.spotify;
      const songDuration = song.item.duration_ms;
      const songProgess = song.item.progress_ms;
      const timeRemaining_ms = songDuration - songProgess;
      setCookie("songURL", songURL, 365);
      setCookie("timeRemaining_ms", timeRemaining_ms, 365);
    })
    .catch(error => {
      console.error(error);
    });
  // Update the iframe's source
  currSong = getCookie("songURL");
  urlParts = currSong.split("/");
  const spotifyTrackUrl = "https://open.spotify.com/embed/track/" + urlParts[4];
  iframe.src = spotifyTrackUrl;
}

// Function to fetch the user's current song from the Spotify API
async function fetchCurrentSong(token) {
  const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }
  });

  return result.json();
}

// Function to set a cookie with a given name, value, and expiration days
function setCookie(name, value, days) {
  const expires = days ? "; expires=" + new Date(new Date().getTime() + (days * 24 * 60 * 60 * 1000)).toUTCString() : "";
  document.cookie = name + "=" + value + expires + "; path=/";
}
