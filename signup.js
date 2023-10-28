window.addEventListener('DOMContentLoaded', domLoaded); // Call domLoaded() when DOM is loaded

function domLoaded() {
    // Get HTML Elements
    const button = document.getElementById('signup-button'); // Update the ID to match your HTML
    const email = document.getElementById('Email'); // Update the ID to match your HTML
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword'); // Update the ID to match your HTML
    const signupError = document.getElementById('signup-error');

    // Event on button press; check user input information
    button.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent the form from submitting

        const emailVal = email.value;
        const passwordVal = password.value;
        const confirmPasswordVal = confirmPassword.value;

        if (emailVal !== '' && passwordVal !== '' && confirmPasswordVal !== '') {
            if (passwordVal.length >= 8) {
                if (passwordVal === confirmPasswordVal) {
                    // Create a new user with Firebase Authentication
                    firebase.auth().createUserWithEmailAndPassword(emailVal, passwordVal)
                        .then((userCredential) => {
                            // User registration successful
                            const user = userCredential.user;
                            console.log("User registered:", user);
                            // You can redirect the user to a new page or show a success message.
                        })
                        .catch((error) => {
                            // Handle Firebase Authentication errors
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            signupError.innerText = errorMessage;
                        });
                } else {
                    signupError.innerText = "Passwords do not match.";
                }
            } else {
                signupError.innerText = "Password must be at least 8 characters long.";
            }
        } else {
            signupError.innerText = "All fields are required.";
        }
    });
}
