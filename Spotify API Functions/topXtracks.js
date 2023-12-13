// Function to get top 5 tracks played

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

// Used to retrieve top played tracks from a user's spotify account
async function getTopTracks(numTracks){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    // Parameter is used to change the number of tracks you want to get
    return (await fetchWebApi(
        'v1/me/top/tracks?time_range=short_term&limit='+numTracks, 'GET'
    )).items;
}

// Get the top tracks and make them displayable
const topTracks = await getTopTracks();
console.log(
    topTracks?.map(
        ({name, artists}) =>
            `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
);
