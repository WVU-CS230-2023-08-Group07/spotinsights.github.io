// Authorization token that must have been created previously
const token = 'Auth Token Here';
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

async function getTopTracks(){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    // ?Adjust limit to increase songs retrieved?
    return (await fetchWebApi(
        'v1/me/top/tracks?time_range=short_term&limit=5', 'GET'
    )).items;
}

async function getRecommendations(){
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
    return (await fetchWebApi(`v1/recommendations?limit=5&seed_tracks=${getTopTracks().join(',')}`, 'GET')).tracks;
}

async function createPlaylist(tracksUri) {
    const {id: user_id} = await fetchWebApi('v1/me', 'GET')

    const playlist = await fetchWebApi(
        `v1/users/${user_id}/playlists`, 'POST', {
            "name": "My recommendation playlist",
            "description": "Playlist created by the tutorial on developer.spotify.com",
            "public": false
        })

    await fetchWebApi(`v1/playlists/${playlist.id}/tracks?uris=${getRecommendations().join(',')}`, 'POST');
}