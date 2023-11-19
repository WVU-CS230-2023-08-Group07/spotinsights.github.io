// Extract the authorization code from the URL (assuming it's in a query parameter named 'code')
const urlParams = new URLSearchParams(window.location.search);
const authorizationCode = urlParams.get('code');

// Replace 'YOUR_CLIENT_ID', 'YOUR_CLIENT_SECRET', and 'YOUR_REDIRECT_URI' with your actual Spotify credentials
const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET';
const redirectUri = 'YOUR_REDIRECT_URI';

// Replace 'YOUR_FIREBASE_COLLECTION' with the actual name of your Firestore collection
const firebaseCollection = 'users';

// Firebase Authentication user
const user = firebase.auth().currentUser;

// Spotify token endpoint
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

// Make a POST request to exchange authorization code for access token
fetch(tokenEndpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
  },
  body: new URLSearchParams({
    'grant_type': 'authorization_code',
    'code': authorizationCode,
    'redirect_uri': redirectUri,
  }),
})
.then(response => response.json())
.then(data => {
  const spotifyAccessToken = data.access_token;

  // Store the Spotify access token in Firestore
  if (user) {
    const userRef = firebase.firestore().collection(firebaseCollection).doc(user.uid);

    userRef.set({
      spotifyAccessToken: spotifyAccessToken,
      // other user details...
    }, { merge: true })
    .then(() => {
      console.log('Spotify access token stored in Firestore');
    })
    .catch((error) => {
      console.error('Error storing Spotify access token in Firestore:', error);
    });
  }})

  // You can now use the access token to make requests to the Spotify API

