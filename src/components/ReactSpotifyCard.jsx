import react from '@astrojs/react'
// import { getLastPlayedTracks } from '../lib/spotify'
// const response = await getLastPlayedTracks(10)

const getSpotifySongs = async () => {
    const response = fetch('/api/spotify')
    console.log('getSPotifySongs response', response)
    const { items } = response;
    return items
}

const songs = await getSpotifySongs()

const formattedTracks = songs.map(({track}) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    title: track.name,
    trackUrl: track.external_urls.spotify
}))

export default function SpotifyCard() {
    return (
        <>
        <div>Spotify Card</div>
        </>
    )
}