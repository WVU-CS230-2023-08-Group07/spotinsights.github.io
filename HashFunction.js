const fs = require('fs');
const bcrypt = require('bcrypt'); //npm install bcrypt

const users = [];

// Hash Function
function addUser(username, password) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  users.push({ username, hash, salt });
}

// Example users
addUser('user1', 'password123');
addUser('user2', 'strongPassword!');

// Save the users array to a JSON file
fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf8');

console.log('Success');
