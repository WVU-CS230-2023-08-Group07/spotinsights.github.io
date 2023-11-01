const user = firebase.auth().currentUser;

if (user) {
  // User is already authenticated
  // You can perform additional actions if needed
} else {
  // User is not authenticated, redirect to login page
  window.location.href = "login.html";
}

// VerifyUser.js
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    } else {
      window.location.href = "login.html"; // Redirect to login page
    }
  });
  
//add <script src="VerifyUser.js"></script> to all pages that require a login to access