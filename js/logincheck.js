/**
 * Retrieves the currently signed-in user from Firebase authentication.
 * This variable holds the reference to the current user, allowing access to user-related information.
 */
const user = firebase.auth().currentUser;

/**
 * Monitors changes in the authentication state using Firebase.
 * If the user is not authenticated (not signed in), redirects them to the login page.
 * This file can be loaded into protected pages to redirect the user if they do not have a valid login.
 * @param {Object} user - The user object representing the current authentication state.
 */
firebase.auth().onAuthStateChanged(function(user){
	if(!user){
		window.location.href = 'login.html'; 
	}
});
