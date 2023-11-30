function signUp() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((userCredential) => {
			// User signed up successfully
			const user = userCredential.user;
			console.log(user);
			window.location.href = 'login.html';
		})
		.catch((error) => {
			console.error(error.message);
			window.alert(error.message);
		});
}
