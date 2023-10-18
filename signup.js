window.addEventListener('DOMContentLoaded', domLoaded); // Call domLoaded() when DOM is loaded

function domLoaded() {
	// Get HTML Elements
	const button = document.getElementById('button');
	const username = document.getElementById('username');
	const password = document.getElementById('password');
	const confPass = document.getElementById('confirmPassword');
	
	// Get database values (with Node.js)
	
	
	// Event on button press; check user input information
	button.addEventListener('click', function() {
		const usernameVal = username.value; // Get username value
		if (usernameVal !== '') {
			// Check username requirements
			if ((usernameVal.length < 8) || (usernameVal.length >= 20)) {
				// CHECK DATABASE
			}
			else {
				// ERROR: USERNAME MUST BE BETWEEN 8 AND 20 CHARACTERS
			}
		}
		else {
			// ERROR: NO USERNAME PROVIDED
		}
	}); 
}
