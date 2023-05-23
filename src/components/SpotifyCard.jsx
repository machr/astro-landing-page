export default function SpotifyCard({songs}) {
    console.log(songs)
    return (
    <section>
        <h3>Last 10 Played Songs</h3>
        <ol>
            {songs.map(track => (
                <li><a href={track.trackUrl}>{track.artist} – {track.title}</a></li>
                ))}
        </ol>
    </section>
    )
}