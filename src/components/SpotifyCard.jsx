   import { getLastPlayedTracks } from '../lib/spotify'


export default async function SpotifyCard() {
    
    // const response = await getLastPlayedTracks(10)
    const response = await fetch('/api/spotify')
    const { items } = await response.json();
    const formattedTracks = items.map(({track}) => ({
        artist: track.artists.map((_artist) => _artist.name).join(', '),
        title: track.name,
        trackUrl: track.external_urls.spotify
    }))

    console.log(items)
    return (
    <section>
        <h3>Last 10 Played Songs</h3>
        <ol>
            {/* {songs.map(track => (
                <li><a href={track.trackUrl}>{track.artist} – {track.title}</a></li>
                ))} */}
        </ol>
    </section>
    )
}