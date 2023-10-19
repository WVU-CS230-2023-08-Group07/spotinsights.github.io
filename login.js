const loginBox = document.getElementById("login-box");
const loginButton = document.getElementById("submit-button");
const loginErrorMsg = document.getElementById("login-error");

/// When user clicks Login button
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginBox.username.value;
    const password = loginBox.password.value;

/// Change values in quotes to change set information
    if (username === "username" && password === "password") {
        alert("Successful login");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})