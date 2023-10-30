// Function used to show a playlist on a webpage

const playlistId = 'Playlist ID';

<iframe
    title="Spotify Embed: Recommendation Playlist "
    src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
    width="100%"
    height="100%"
    style={{ minHeight: '360px' }}
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
/>