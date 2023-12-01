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
	
	if (localStorage.getItem('spotifyInfo') !== null) {
		document.getElementById('login-button').style.display = 'none';
		document.getElementById('signup-button').style.display = 'none';
		const userProfile = document.getElementById('user-profile');
		userProfile.style.display = 'block';
		const spotifyInfo = JSON.parse(localStorage.getItem('spotifyInfo'));
		
		const profileImageElement = document.getElementById('profile-image');
		profileImageElement.src = spotifyInfo.images[1].url;
		profileImageElement.style.display = 'block';
		
		const displayNameElement = document.getElementById('display-name');
		displayNameElement.textContent = spotifyInfo.display_name;
		displayNameElement.style.display = 'block';
	}
}
