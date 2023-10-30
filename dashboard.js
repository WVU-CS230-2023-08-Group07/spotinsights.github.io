if (localStorage.getItem('spotifyInfo') !== null) {
  document.getElementById('login-button').style.display = 'none';
  document.getElementById('signup-button').style.display = 'none';
  const spotifyInfo = JSON.parse(localStorage.getItem('spotifyInfo'));

  const profileImageElement = document.getElementById('profile-image');
  profileImageElement.src = spotifyInfo.images[1].url;

  const displayNameElement = document.getElementById('display-name');
  displayNameElement.textContent = spotifyInfo.display_name;
}
