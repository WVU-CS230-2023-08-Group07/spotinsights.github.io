//@author Cayden Pava
//@brief JavaScript file for testing how to add JavaScript objects to a JSON file; requires Node.js

const fs = require('fs'); // File system module
const path = 'accounts.json'; // Path for the JSON file

// Adds an account to the JSON file
function addAccount(userIn, passIn, emailIn, displayIn) {
    let existingAccounts = []; // Array for existing accounts in JSON file

    try {
        const rawData = fs.readFileSync(path, 'utf8'); // Read in raw data from file
        if (rawData) {
            existingAccounts = JSON.parse(rawData); // Parse raw data as JSON data
        }
    } catch (err) {
        if (err.code === 'ENOENT') { // If file doesn't exist (ENOENT: Error, No Entry)
            existingAccounts = []; // Set existing accounts to empty array
        } else {
            console.error('Error reading from file:', err);
            return;
        }
    }

    const newAccountObj = { // Create a new account object
        username: userIn,
        password: passIn,
        email: emailIn,
        display_name: displayIn,
    };

    existingAccounts.push(newAccountObj); // Add the new account to the existing data

    const newDataString = JSON.stringify(existingAccounts, null, 2); // Convert existing data to a JSON string (2 for pretty printing)

    fs.writeFileSync(path, newDataString, 'utf8'); // Write the JSON string to the JSON file
    console.log('Data has been written to:', path); // Successful writing
}

addAccount('garrettbobbyferguson123', 'P$BLN4feavkuPV(@$e24', 'gbfmail987@gmail.com', 'GBF'); // Test 1
addAccount('testuser245', 'password123', 'basic@aol.com', 'User 2'); // Test 2
