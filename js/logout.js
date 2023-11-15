function signOut() {
	console.log('called');
	firebase.auth().signOut()
      .then(() => {
        // User signed out successfully
        console.log('User signed out');
        //window.location.href = 'index.html';
      })
      .catch((error) => {
        console.error(error.message);
        //window.location.href = 'dashboard.html';
      });
}

