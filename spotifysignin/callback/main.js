const result = getCookie("result");
var currSong = getCookie("songURL");
var urlParts = currSong.split("/");
var timeRemaining_ms = getCookie("timeRemaining_ms");
var accessToken = getCookie("accessToken");
console.log(currSong);
console.log(result);
console.log(timeRemaining_ms);
document.cookie = "timeRemaining_ms" + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
var spotifyTrackUrl = "https://open.spotify.com/embed/track/" + urlParts[4];

    // Use the refresh interval from the cookie in the meta tag
    var metaTag = document.createElement('meta');
    metaTag.httpEquiv = "refresh";
    metaTag.content = timeRemaining_ms;
    document.getElementsByTagName('head')[0].appendChild(metaTag);


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
setTimeout(refreshIframe, timeRemaining_ms);
populateUI(JSON.parse(result));



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

function refreshIframe() {
    const iframe = document.getElementById('spotifyEmbed');
  fetchCurrentSong(accessToken)
  .then(currentSongData => {
    var song = currentSongData;
    var songURL = song.item.external_urls.spotify;
    var songDuration = song.item.duration_ms;
    var songProgess = song.item.progress_ms;
    var timeRemaining_ms = songDuration - songProgess;
    setCookie("songURL", songURL, 365);
    setCookie("timeRemaining_ms", timeRemaining_ms, 365);
  })
  .catch(error => {
    console.error(error);
  });
    currSong = getCookie("songURL");
    urlParts = currSong.split("/");
    timeRemaining_ms = getCookie("timeRemaining_ms");
    spotifyTrackUrl = "https://open.spotify.com/embed/track/" + urlParts[4];
    iframe.src = iframe.src; 
}

async function fetchCurrentSong(token) {
  const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return result.json();
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}
