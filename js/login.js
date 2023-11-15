	/*const firebaseConfig = {
		apiKey: "AIzaSyCiaoHpxeFZWA4gb6NJzMGunj7ytNSChKY",
		authDomain: "spotinsights.firebaseapp.com",
		projectId: "spotinsights",
		storageBucket: "spotinsights.appspot.com",
		messagingSenderId: "293805645735",
		appId: "1:293805645735:web:490f3ccf4444b613f16082"
	};
	firebase.initializeApp(firebaseConfig); */
  function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed in successfully
        const user = userCredential.user;
        console.log(user);
        window.location.href = 'dashboard.html';
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

	function signOut() {
	firebase.auth().signOut()
      .then(() => {
        // User signed out successfully
        console.log('User signed out');
        window.location.href = 'index.html';
      })
      .catch((error) => {
        console.error(error.message);
      });
    }
/* function domLoaded() {
	// Get HTML Elements
	const button = document.getElementById('login-button');
	const email = document.getElementById('email');
	const password = document.getElementById('password');
	const loginError = document.getElementById('login-error');
	
	// Event on button press; check user input information
	button.addEventListener('click', (e) => {
		e.preventDefault(); // Prevent the form from submitting
		
		const emailVal = email.value;
		const passwordVal = password.value;
		
		// Sign in the user
		signIn(emailVal, passwordVal)
			.then((user) => {
				console.log("Sign-in successful:", user);
				window.location.href = 'dashboard.html'; // Redirect to dashboard.html
			})
			.catch((error) => {
				console.error("Sign-in failed:", error);
				// Handle login errors to the user
				loginError.innerText = 'Invalid username or password. Please try again.';
			});
	});
}
*/