let spotifyTrackUrl = '';
let urlParts = '';

document.addEventListener('DOMContentLoaded', async function () {
  try {
    const user = firebase.auth().currentUser;

    if (user) {
      const userRef = firebase.firestore().collection('private').doc('uids').collection(user.uid);

      const snapshot = await userRef.get();

      if (!snapshot.empty) {
        const lastDocument = snapshot.docs[snapshot.docs.length - 1].data();

        console.log(lastDocument); // This will contain your Spotify information

        // Assuming 'songURL' is stored in Firestore, adjust the property name if needed
        const songURL = lastDocument.songURL;

        if (songURL) {
          var urlParts = songURL.split('/');
          spotifyTrackUrl = "https://open.spotify.com/embed/track/" + urlParts[4];

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
        } else {
          console.error('songURL is not present in Firestore.');
        }
      } else {
        console.error('No documents found in Firestore for the user.');
      }
    } else {
      console.error('User not authenticated.');
    }
  } catch (error) {
    console.error('Error retrieving Spotify information from Firestore:', error);
  }
});

populateUI(JSON.parse(localStorage.getItem("spotifyInfo")));

function populateUI(profile) {
  document.getElementById("displayName").innerText = profile.display_name;
  // if (profile.images[0]) {
  //   const profileImage = new Image(200, 200);
  //   profileImage.src = profile.images[1].url;
  //   document.getElementById("avatar").appendChild(profileImage);
  //   document.getElementById("imgUrl").innerText = profile.images[0].url;
  // }
  document.getElementById("id").innerText = profile.id;
  document.getElementById("email").innerText = profile.email;
  document.getElementById("uri").innerText = profile.uri;
  document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
  document.getElementById("url").innerText = profile.href;
  document.getElementById("url").setAttribute("href", profile.href);
}

function refreshIframe() {
  const iframe = document.getElementById('spotifyEmbed');

  // Check if "songURL" is present in localStorage
  if (localStorage.getItem("songURL")) {
    var urlParts = localStorage.getItem("songURL").split('/');
    spotifyTrackUrl = "https://open.spotify.com/embed/track/" + urlParts[4];
    iframe.src = spotifyTrackUrl;
  } else {
    console.error('songURL is not present in localStorage.');
  }

  fetchCurrentSong(localStorage.getItem("accessToken"))
    .then(currentSongData => {
      var song = currentSongData;
      localStorage.setItem("songURL", song.item.external_urls.spotify);
    })
    .catch(error => {
      console.error(error);
    });
}
