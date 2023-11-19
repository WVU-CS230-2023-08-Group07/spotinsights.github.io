const user = firebase.auth().currentUser;

if (user) {
  const userRef = firebase.firestore().collection('users').doc(user.uid);

  userRef.get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        const spotifyAccessToken = userData.spotifyAccessToken;

        // Use the access token to make requests to the Spotify API
        // Example: Fetch user data from Spotify API
        fetch('https://api.spotify.com/v1/me', {
          headers: {
            'Authorization': 'Bearer ' + spotifyAccessToken,
          },
        })
        .then(response => response.json())
        .then(userData => {
          // Handle Spotify user data
          console.log(userData);
        })
        .catch(error => {
          console.error('Error fetching Spotify user data:', error);
        });
      } else {
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.error('Error getting user document from Firestore:', error);
    });
}
