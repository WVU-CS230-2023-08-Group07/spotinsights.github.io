/* Various different authentication functions used in Firebase */

// Function to create a new user (and automatically sign in)
function signUp(email, password) {
	return new Promise((resolve, reject) => {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// User signed up successfully
				const user = userCredential.user;
				console.log('User registered:', user);
				resolve(user); // Resolve the promise with the user
			})
			.catch((error) => {
				// An error happpened
				console.error('Error signing up:', error.message);
				reject(error.message); //Reject the promise with the error message
			});
	});
}

// Function to log in the user
function signIn(email, password) {
	return new Promise((resolve, reject) => {
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// User signed in successfully
				const user = userCredential.user;
				console.log('User signed in:', user);
				resolve(user); // Resolve the promise with the user
			})
			.catch((error) => {
				// An error happened
				console.error('Error signing in:', error.message);
				reject(error.message); //Reject the promise with the error message
			});
	});
}

// Function to sign out the user
function signOut() {
	return new Promise((resolve, reject) => {
		firebase.auth().signOut()
			.then(() => {
				// User signed out successfully
				console.log('User signed out.');
				resolve(); // Resolve the promise
			})
			.catch((error) => {
				// An error happened
				console.error('Error signing out:', error.message);
				reject(error.message); //Reject the promise with the error message
			});
	});
}

// Function to get user (if signed in)
function getUser() {
	return new Promise((resolve, reject) => {	
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			unsubscribe(); // Unsubscribe to observer to prevent memory leaks
			if (user) {
				// User is signed in
				console.log('User is signed in:', user);
				resolve(user); // Resolve the promise with the user
			} else {
				// User is not signed in
				console.log('No user is signed in.');
				reject(); // Reject the promise
			}
		});
	});
}
