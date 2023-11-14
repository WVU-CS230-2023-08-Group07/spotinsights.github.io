window.addEventListener('DOMContentLoaded', domLoaded); // Call domLoaded() when DOM is loaded

function domLoaded() {
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
