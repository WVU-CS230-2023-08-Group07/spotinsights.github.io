let song;

document.addEventListener('DOMContentLoaded', async function () {
  document.getElementById("authorizeButton").style.display = "none";
  const clientId = "1a9863d157de4ba9aff6cfec18843f5b";
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  async function saveSpotifyInfo(spotifyToken) {
    try {
      const user = firebase.auth().currentUser;

      let uid;

      if (user) {
        uid = user.uid;
      } else {
        const anonymousUser = await firebase.auth().signInAnonymously();
        uid = anonymousUser.user.uid;
        console.log('Anonymous User:', anonymousUser);
      }

      const userRef = firebase.firestore().collection('private').doc(uid);

      // Use set with merge option to update or create the document
      await userRef.set({
        // spotifyUsername: profile.display_name,
        spotifyToken: spotifyToken,
        // other user details...
      }, { merge: true });

      console.log('Spotify information stored in Firestore directory');
    } catch (error) {
      console.error('Error storing Spotify information in Firestore:', error);
    }
  }

  

  async function getAccessToken(clientId, code) {
      const verifier = localStorage.getItem("verifier");
      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", "http://localhost:8080/spotifysignin/callback");
      params.append("code_verifier", verifier);
    
      const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
      });
    
      if (!result.ok) {
        // Handle error, log or throw an exception
        console.error("Error fetching token:", result.status);
        return;
      }
      
      const data = await result.json();
      
      if (!data.access_token) {
        // Handle missing access_token in the response
        console.error("Access token not found in response:", data);
        return;
      }
      
      const { access_token } = data;
      await saveSpotifyInfo(access_token);
      localStorage.setItem("access_token", access_token);
      return access_token;
    }

    async function redirectToAuthCodeFlow(clientId) {
      const verifier = generateCodeVerifier(128);
      const challenge = await generateCodeChallenge(verifier);
    
      localStorage.setItem("verifier", verifier);
    
      const params = new URLSearchParams();
      params.append("client_id", clientId);
      params.append("response_type", "code");
      // params.append("redirect_uri", "https://wvu-cs230-2023-08-group07.github.io/spotinsights.github.io/spotifysignin/");
      params.append("redirect_uri", "http://localhost:8080/spotifysignin/callback");
      params.append("scope", "user-read-private user-read-email user-read-currently-playing user-read-playback-state");
      params.append("code_challenge_method", "S256");
      params.append("code_challenge", challenge);

      localStorage.setItem("authorizationCode", params.toString());
      await getAccessToken(clientId, code);
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
    // getAccessToken(clientId, code);
    await redirectToAuthCodeFlow(clientId);
    
  // if (!code) {
  //   redirectToAuthCodeFlow(clientId);
  // } 
  //   try {
  //     const token = await getAccessToken(clientId, code);
  //     // const profile = await fetchProfile(token);
  //   } catch (error) {
  //     console.error('error setting constants or saving data', error);
  //   }
});



// export async function redirectToAuthCodeFlow(clientId) {
//   const verifier = generateCodeVerifier(128);
//   const challenge = await generateCodeChallenge(verifier);

//   localStorage.setItem("verifier", verifier);

//   const params = new URLSearchParams();
//   params.append("client_id", clientId);
//   params.append("response_type", "code");
//   // params.append("redirect_uri", "https://wvu-cs230-2023-08-group07.github.io/spotinsights.github.io/spotifysignin/");
//   params.append("redirect_uri", "http://localhost:8080/spotifysignin/callback");
//   params.append("scope", "user-read-private user-read-email user-read-currently-playing user-read-playback-state");
//   params.append("code_challenge_method", "S256");
//   params.append("code_challenge", challenge);

//   document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
// }

// function generateCodeVerifier(length) {
//   let text = '';
//   let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }

//TODO: make this its own function for use in refreshing expired tokens
// export async function getAccessToken(clientId, code) {
//   const verifier = localStorage.getItem("verifier");

//   const params = new URLSearchParams();
//   params.append("client_id", clientId);
//   params.append("grant_type", "authorization_code");
//   params.append("code", code);
//   params.append("redirect_uri", "http://localhost:8080/spotifysignin/callback");
//   params.append("code_verifier", verifier);

//   const result = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: params
//   });

//   const { access_token } = await result.json();
//   return access_token;
// }

// async function fetchCurrentSong(token) {
//   const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
//     method: "GET", headers: { Authorization: `Bearer ${token}` }
//   });

//   return result.json();
// }

// async function populateUI(profile) {
//   localStorage.setItem("spotifyInfo", JSON.stringify(profile));
//   await fetchCurrentSong(localStorage.getItem("accessToken"))
//     .then(currentSongData => {
//       song = currentSongData;
//       localStorage.setItem("songURL", song.item.external_urls.spotify);
//       console.log(localStorage.getItem("songURL"));
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   window.location.href = 'callback/';
// }


  // async function fetchProfile() {
  //   // Retrieve the authorization code from local storage
  //   const authorizationCode = localStorage.getItem("authorizationCode");
  
  //   // Check if the authorization code is available
  //   if (!authorizationCode) {
  //     console.error("Authorization code not found in local storage");
  //     return;
  //   }
  
  //   try {
  //     // Extract the code from the stored parameters
  //     const code = new URLSearchParams(authorizationCode).get("code");
  
  //     // Use the code to get the access token
  //     const token = await getAccessToken(clientId, code);
  
  //     // Fetch the Spotify profile and save the information
  //     const profile = await fetchProfile(token);
  //   } catch (error) {
  //     console.error("Error fetching profile:", error);
  //   }
  // }