window.addEventListener('DOMContentLoaded', domLoaded); // Call domLoaded() when DOM is loaded

function domLoaded() {
	// Get HTML Elements
	const loginButton = document.getElementById('login-button');
	const logoutButton = document.getElementById('logout-button');
	const signupButton = document.getElementById('signup-button');
	
	// Make sure signup button is visible
	signupButton.style.display = 'initial';
	
	// Check if user is authenticated
	getUser()
		.then((user) => {
			// Authenticated user
			console.log('Authenticated user:', user);
			
			// Set temporary email value
			document.getElementById('user-email').innerText = user.email;
			
			logoutButton.style.display = 'initial'; // Add logout button
			logoutButton.addEventListener('click', () => {
				signOut()
					.then(() => {
						console.log('Sign out successful');
						window.location.href = 'dashboard.html'; // Refresh dashboard.html
					})
					.catch((error) => {
						console.error('Error signing out:', error);
					});
			});
		})
		.catch(() => {
			// No authenticated user
			console.log('No authenticated user');
			
			/* TEMPORARY */
			document.getElementById('user-email').innerText = 'No authenticated user';
			
			loginButton.style.display = 'initial'; // Add login button
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