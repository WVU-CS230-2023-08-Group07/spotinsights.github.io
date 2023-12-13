window.addEventListener('DOMContentLoaded', domLoaded); // Call domLoaded() when DOM is loaded

function domLoaded() {
	// Get HTML Elements
	const logoutButton = document.getElementById('logout-button');
	const button1 = document.getElementById('submit-1');	
	const button2 = document.getElementById('submit-2');
	
	// Check if user is authenticated
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			// User is signed in
			console.log('User is signed in:', user);
			
			// Display the logout button
			logoutButton.style.display = 'initial';
			
			// Button1 event listener (email)
			button1.addEventListener('click', (event) => {
				// Get HTML Elements
				const email = document.getElementById('eMail').value;
				const password = document.getElementById('password').value;
				
				if (password !== '') { // Check that the password is provided
					if (email !== '') { // Check that an email is provided
						const credential = firebase.auth.EmailAuthProvider.credential( // Create a credential obj with the given password
							user.email,
							password
						);
						
						user.reauthenticateWithCredential(credential) // Attempt to reauthenticate user
							.then(() => {
								// Successfully reauthenticated user
								user.verifyBeforeUpdateEmail(email) // Send email change verification
									.then(() => {
									// Verification email successfully sent
										console.log('Please check your email for verification, you will currently be logged out.');
										window.alert('Please check your email for verification, you will currently be logged out.');
										
										window.location.href = 'logout.html'; // Log out user
									})
									.catch((error) => {
										console.error('Error updating email:', error.message);
										window.alert('Invalid email value.');
									});	
							})
							.catch((error) => {
								console.error('Error reauthenticating user:', error.message);
								window.alert('Invalid password value.');
							});						
					}
					else {
						console.error('No provided email value.');
						window.alert('No provided email value.');
					}
				}
				else {
					console.error('Password is required.');
					window.alert('Password is required.');
				}
			});
			
			// Button2 event listener (password)
			/*
			button2.addEventListener('click', (event) => {
				// Get HTML Elements
				const oldPass = document.getElementById('old-password').value;
				const newPass = document.getElementById('new-password').value;
				const confNewPass = document.getElementById('re-enter-password').value;
				
				const credential = firebase.auth.EmailAuthProvider.credential( // Create a credential obj with the oldPass
					user.email,
					oldPass
				);
				
				user.reauthenticateWithCredential(credential) // Attempt to reauthenticate user with oldPass credential
					.then(() => {
						
					})
					.then(() => {
						
					})
					.catch((error) => {
						
					});
					
				
				
				
				if (newPass === confNewPass) { // Check that newPass and confNewPass are the same
					if (newPass.length >= 8) { // Check password is >= 8 characters
						if (/[A-Z]/.test(newPass) && /[a-z]/.test(newPass)) { // Check that password contains uppercase and lowercase characters
							if (/\d/.test(newPass)) { // Check that password contains a Number
								
							}
							else {
								console.error('New password must contain at least one number.');
								window.alert('New password must contain at least one number.');
							}
						}
						else {
							console.error('New password must contain at least one lowercase letter and one uppercase letter.');
							window.alert('New password must contain at least one lowercase letter and one uppercase letter.');
						}
					}
					else {
						console.error('New password must be at least 8 characters long.');
						window.alert('New password must be at least 8 characters long.');
					}
				}
				else {
					console.error('New passwords do not match.');
					window.alert('New passwords do not match.');
				}
				
			});*/
		}
		else {
			// User is not signed in
			console.log('No user is signed in.');
		}
	});
}
