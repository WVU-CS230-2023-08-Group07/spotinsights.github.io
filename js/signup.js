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
      });
  }



/* window.addEventListener('DOMContentLoaded', domLoaded); // Call domLoaded() when DOM is loaded

function domLoaded() {
    // Get HTML Elements
    const button = document.getElementById('signup-button'); // Update the ID to match your HTML
    const email = document.getElementById('email'); // Update the ID to match your HTML
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password'); // Update the ID to match your HTML
    const signupError = document.getElementById('signup-error');

    // Event on button press; check user input information
    button.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the form from submitting

        const emailVal = email.value;
        const passwordVal = password.value;
        const confirmPasswordVal = confirmPassword.value;

        if (emailVal !== '' && passwordVal !== '' && confirmPasswordVal !== '') { // Check fields are not empty
            if (passwordVal.length >= 8) { // Check password is >= 8 characters
                if (passwordVal === confirmPasswordVal) { // Check password and confirmPassword are the same
					
					// Sign up the user
                    signUp(emailVal, passwordVal)
						.then((user) => {
							console.log("Sign-up successful:", user);
							window.location.href = 'dashboard.html'; // Redirect to dashboard.html
						})
						.catch((error) => {
							console.error("Sign-up failed:", error);
							// Handle signup errors to the user
							signupError.innerText = error;
						});
				
                } else {
                    signupError.innerText = 'Passwords do not match.';
                }
            } else {
                signupError.innerText = 'Password must be at least 8 characters long.';
            }
        } else {
            signupError.innerText = 'All fields are required.';
        }
    });
} */
