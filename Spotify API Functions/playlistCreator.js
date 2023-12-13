// Function used to create a playlist of of 10 recommendation songs

// Authorization token that must have been created previously
const token = 'Auth Token Here';

// Used to fetch the Web API
async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body:JSON.stringify(body)
    });
    return await res.json();
}

// Use function in recommendation.js, but you need to add "spotify:song:" in front of all the track ID's
const tracksUri = [ ]; 

// Create the playlist
async function createPlaylist(tracksUri){
    // Fetch the web API
    const { id: user_id } = await fetchWebApi('v1/me', 'GET')
    
    // Create the new playlist
    const playlist = await fetchWebApi(
        `v1/users/${user_id}/playlists`, 'POST', {
            "name": "My recommendation playlist",
            "description": "Playlist created by Spotinsights' Analytics",
            "public": false
        })

    // Final API call
    await fetchWebApi(
        `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
        'POST'
    );

    return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);
