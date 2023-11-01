const user = firebase.auth().currentUser;

firebase.auth().onAuthStateChanged(function(user){
	if(user){}
	else{
		window.location.href = "login.html"; 
	}
});
