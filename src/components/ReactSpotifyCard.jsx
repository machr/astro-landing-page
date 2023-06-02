import react from '@astrojs/react'
// import { getLastPlayedTracks } from '../lib/spotify'
// const response = await getLastPlayedTracks(10)

const getSpotifySongs = async () => {
    const response = await fetch('/api/spotify')
    console.log('getSPotifySongs response', response)
    const { items } = await response;
    return items
}

export default  function SpotifyCard() {
    const songs = getSpotifySongs();

    const formattedTracks = songs.map(({track}) => ({
        artist: track.artists.map((_artist) => _artist.name).join(', '),
        title: track.name,
        trackUrl: track.external_urls.spotify
    }))

    console.log(formattedTracks)
    return (
        <>
        <div>Spotify Card</div>
        </>
    )
}