window.addEventListener('DOMContentLoaded', domLoaded); // Call domLoaded() when DOM is loaded

function domLoaded() {
	// Get HTML Elements
	const logoutButton = document.getElementById('logout-button');
	
	// Check if user is authenticated
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			// User is signed in
			console.log('User is signed in:', user);
			
			// Display the logout button
			logoutButton.style.display = 'initial';
		}
		else {
			// User is not signed in
			console.log('No user is signed in.');
		}
	});
}
