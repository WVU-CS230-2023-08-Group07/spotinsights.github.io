const user = firebase.auth().currentUser;

if (user) {
  const userRef = firebase.firestore().collection('users').doc(user.uid);

  userRef.set({
    spotifyAccessToken: spotifyAccessToken,
    // other user details...
  }, { merge: true })
  .then(() => {
    console.log('Access token stored in Firestore');
  })
  .catch((error) => {
    console.error('Error storing access token in Firestore:', error);
  });
}
