window.addEventListener('DOMContentLoaded', domLoaded); // Call domLoaded() when DOM is loaded

function domLoaded() {
	const username = document.getElementById('username');
	const password = document.getElementById('password');
	const loginButton = document.getElementById('login-button');
	const loginError = document.getElementById('login-error');
	
	// When user clicks Login button
	loginButton.addEventListener('click', (event) => {
		event.preventDefault();
		const usernameVal = username.value;
		const passwordVal = password.value;
		
		// Check conditions for username and password
		if (usernameVal === '' || passwordVal === '') {
			loginError.style.opacity = 1;
			loginError.innerHTML = 'Please enter the required fields';
		} else if (usernameVal !== 'username' || passwordVal !== 'password') {
			loginError.style.opacity = 1;
			loginError.innerHTML = 'Incorrect username and/or password';
		} else {
			alert('Successful login');
			location.reload();
		}
	});
}
