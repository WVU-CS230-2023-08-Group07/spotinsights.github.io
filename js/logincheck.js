const user = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged(function(user){
	if(!user){
		firebase.auth().signOut();
		window.location.href = 'login.html'; 
	}
});
