/**
 * Handles user registration by creating an account using Firebase authentication.
 * Validates the entered email and password, ensuring they meet specified criteria.
 * If successful, redirects the user to the dashboard; otherwise, displays an error message.
 */
function signUp() {
	// Retrieve user input values
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const confPassword = document.getElementById('confirm-password').value;
	
	// Check if entered passwords match
	if (password === confPassword) {
		// Check if password is at least 8 characters long
		if (password.length >= 8) { 
			 // Check if password contains at least one uppercase and one lowercase letter
			if (/[A-Z]/.test(password) && /[a-z]/.test(password)) {
				// Check if password contains at least one digit
				if (/\d/.test(password)) {
					// Attempt to create a user account using Firebase authentication
					firebase.auth().createUserWithEmailAndPassword(email, password)
						.then((userCredential) => {
							// User signed up successfully
							const user = userCredential.user;
							console.log(user);
							// Redirect the user to the dashboard upon successful signup
							window.location.href = 'dashboard.html'; 
						})
						.catch((error) => {
							// Log and display error messages if user signup fails
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

/**
 * Toggles the visibility of the password input field.
 * Allows the user to show or hide the entered password.
 * @param {string} passType - The type of password input field (e.g., 'password' or 'confirm-password').
 */
function passVis(passType) {
	// Retrieve password input element and toggle button by element ID
	const pass = document.getElementById(passType);
	const btn = document.getElementById(passType.concat('-vis'));
	
	// Toggle between password and text visibility
	if (pass.type === 'password') {
		pass.type = 'text';
		btn.innerText = 'Hide Pass';
	}
	else {
		pass.type = 'password';
		btn.innerText = 'Show Pass';
	}
}
