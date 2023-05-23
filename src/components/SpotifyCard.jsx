import { getLastPlayedTracks } from '../lib/spotify'

const response = await getLastPlayedTracks(10)
const { items } = await response.json();
const formattedTracks = items.map(({track}) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    title: track.name,
    trackUrl: track.external_urls.spotify
}))

export default function SpotifyCard() {
    return (
    <section>
        <h3>Last 10 Played Songs</h3>
        <ol>
            {formattedTracks.map(track => (
                <li><a href={track.trackUrl}>{track.artist} – {track.title}</a></li>
                ))}
        </ol>
    </section>
    )
}