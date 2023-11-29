document.addEventListener('DOMContentLoaded', async function () {
  try {
    const user = firebase.auth().currentUser;

    if (user) {
      // User is authenticated, proceed with retrieving and displaying Spotify information.
      const uidsDocRef = firebase.firestore().collection('private');
      const userRef = uidsDocRef.doc(user.uid);

      const snapshot = await userRef.get();

      if (!snapshot.empty) {
        const lastDocument = snapshot.docs[0].data(); // Use the latest document

        console.log(lastDocument); // This will contain your Spotify information

        // Adjust the field names based on your actual document structure
        const songURL = lastDocument.spotifyUsername;
        const spotifyToken = lastDocument.spotifyToken;

        if (songURL && spotifyToken) {
          // ... rest of your code remains unchanged
        } else {
          console.error('spotifyUsername or spotifyToken is not present in Firestore.');
        }
      } else {
        console.error('No documents found in Firestore for the user.');
      }
    } else {
      // User is not authenticated. This might be an anonymous user.
      // Retrieve Spotify information using the temporary identifier for anonymous users.
      const tempId = 'anonymous_uid'; // Use the same temporary identifier as in saveSpotifyInfo
      const uidsDocRef = firebase.firestore().collection('private');
      const userRef = uidsDocRef.doc(tempId);

      const snapshot = await userRef.get();

      if (!snapshot.empty) {
        const lastDocument = snapshot.docs[0].data(); // Use the latest document

        console.log(lastDocument); // This will contain your Spotify information for anonymous users

        // Adjust the field names based on your actual document structure
        const songURL = lastDocument.spotifyUsername;
        const spotifyToken = lastDocument.spotifyToken;

        if (songURL && spotifyToken) {
          // Create and append Spotify Embed iframe
          var urlParts = songURL.split('/');
          const spotifyTrackUrl = "https://open.spotify.com/embed/track/" + urlParts[4];

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

          // Fetch current song and update localStorage
          fetchCurrentSong(spotifyToken)
            .then(currentSongData => {
              var song = currentSongData;
              localStorage.setItem("songURL", song.item.external_urls.spotify);
            })
            .catch(error => {
              console.error(error);
            });

          // Display Spotify information in your UI
          document.getElementById("accessToken").innerText = spotifyToken;
          document.getElementById("displayName").innerText = lastDocument.spotifyUsername;

          // For debugging, you can log the entire document
          console.log('Firestore Document:', lastDocument);
        } else {
          console.error('spotifyUsername or spotifyToken is not present in Firestore.');
        }
      } else {
        console.error('No documents found in Firestore for the anonymous user.');
      }
    }
  } catch (error) {
    console.error('Error retrieving Spotify information from Firestore:', error);
  }
});

// Function to fetch the current song using Spotify API
async function fetchCurrentSong(accessToken) {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Unable to fetch current song.');
  }

  return response.json();
}
