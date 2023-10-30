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
