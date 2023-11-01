// VerifyUser.js
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    } else {
      window.location.href = "login.html"; // Redirect to login page
    }
  });
  
//add <script src="VerifyUser.js"></script> to all pages that require a login to access