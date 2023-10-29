let song;
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("authorizeButton").style.display = "none";
  const clientId = "1a9863d157de4ba9aff6cfec18843f5b";
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  
  if (!code) {
    redirectToAuthCodeFlow(clientId);
  } else {
    

    getAccessToken(clientId, code)
        .then(token => {
            localStorage.setItem("accessToken", token);
            return fetchProfile(token);
        })
        .then(profile => {
            populateUI(profile);
        })
        .catch(error => console.error(error));
  }
});

export async function redirectToAuthCodeFlow(clientId) {
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

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}
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

async function fetchProfile(token) {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}


async function fetchCurrentSong(token) {
  const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: "GET", headers: { Authorization: `Bearer ${token}` }
  });
  
  return result.json();
}

function populateUI(profile) {
  localStorage.setItem("spotifyInfo", JSON.stringify(profile));
  fetchCurrentSong(localStorage.getItem("accessToken"))
  .then(currentSongData => {
    song = currentSongData;
    localStorage.setItem("songURL", song.item.external_urls.spotify);
  })
  .catch(error => {
    console.error(error);
  });
  window.location.href = 'callback/';
}
