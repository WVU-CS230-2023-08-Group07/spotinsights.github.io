// Sign up function with Firebase
function signUp() {
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const confPassword = document.getElementById('confirm-password').value;
	
	if (password === confPassword) { // Check password and confirmPassword are the same
		if (password.length >= 8) { // Check password is >= 8 characters
			if (/[A-Z]/.test(password) && /[a-z]/.test(password)) { // Check that password contains uppercase and lowercase characters
				if (/\d/.test(password)) { // Check that password contains a number
					
					firebase.auth().createUserWithEmailAndPassword(email, password)
						.then((userCredential) => {
							// User signed up successfully
							const user = userCredential.user;
							console.log(user);
							//window.location.href = 'login.html';
							window.location.href = 'dashboard.html'; // Seems to automatically authenticate user
						})
						.catch((error) => {
							console.error(error.message);
							window.alert(error.message);
						});
						
				}
				else {
					console.error('Password must contain at least one number.');
					window.alert('Password must contain at least one number.');
				}
			}
			else {
				console.error('Password must contain at least one lowercase letter and one uppercase letter.');
				window.alert('Password must contain at least one lowercase letter and one uppercase letter.');
			}
		}
		else {
			console.error('Password must be at least 8 characters long.');
			window.alert('Password must be at least 8 characters long.');
		}
	} 
	else {
		console.error('Passwords do not match.');
		window.alert('Passwords do not match.');
	}
}

// Toggle password visibility
function passVis(passType) {
	const pass = document.getElementById(passType);
	const btn = document.getElementById(passType.concat('-vis'));
	
	if (pass.type === 'password') {
		pass.type = 'text';
		btn.innerText = 'Hide Pass';
	}
	else {
		pass.type = 'password';
		btn.innerText = 'Show Pass';
	}
}
