// Function to generate 5 recommendations based on your top played tacks

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

// Call "top5tracks.js" function "getTopTracks" here to store the result to be used for the recommendations
const topTracksIds = [ ]; 

// Get recommendations based on the top tracks
async function getRecommendations(){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
    return (await fetchWebApi(
        `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
    )).tracks;
}

// Call recommendedTracks function and display it
const recommendedTracks = await getRecommendations();
console.log(
    recommendedTracks.map(
        ({name, artists}) =>
            `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
);
