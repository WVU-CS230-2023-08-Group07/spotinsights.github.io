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
			window.alert('Invalid user credentials');
		});
}

function signOut() {
	firebase.auth().signOut()
		.then(() => {
			// User signed out successfully
			console.log('User signed out');
			window.location.href = 'login.html';
		})
		.catch((error) => {
			console.error(error.message);
		});
}
