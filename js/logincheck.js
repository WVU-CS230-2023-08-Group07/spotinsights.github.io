const user = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged(function(user){
	firebase.auth().signOut();
	if(!user){
		window.location.href = 'login.html'; 
	}
});
