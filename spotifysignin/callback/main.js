console.log(localStorage.getItem("spotifyInfo"));
var urlParts = localStorage.getItem("songURL").split("/");


var spotifyTrackUrl = "https://open.spotify.com/embed/track/" + urlParts[4];

const iframe = document.createElement('iframe');
iframe.style.borderRadius = '12px';
iframe.src = spotifyTrackUrl;
iframe.width = '25%';
iframe.height = '352';
iframe.frameBorder = '0';
iframe.allowFullscreen = true;
iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
iframe.loading = 'lazy';

const spotifyEmbedContainer = document.getElementById('spotifyEmbed');
spotifyEmbedContainer.appendChild(iframe);
refreshIframe();

populateUI(JSON.parse(localStorage.getItem("spotifyInfo")));



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

function refreshIframe() {
    const iframe = document.getElementById('spotifyEmbed');
  fetchCurrentSong(localStorage.getItem("accessToken"))
  .then(currentSongData => {
    var song = currentSongData;
    localStorage.setItem("songURL", song.item.external_urls.spotify);
 })
  .catch(error => {
    console.error(error);
  });
    urlParts = localStorage.getItem("songURL").split("/");
    spotifyTrackUrl = "https://open.spotify.com/embed/track/" + urlParts[4];
    iframe.src = iframe.src; 
}

async function fetchCurrentSong(token) {
  const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return result.json();
}
