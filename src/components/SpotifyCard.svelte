<script>
  export let songs;
  const tracks = songs.items.map(({ track }) => ({
    id: track.id,
    artist: track.artists.map((_artist) => _artist.name).join(", "),
    title: track.name,
    trackUrl: track.external_urls.spotify,
  }));

  console.log("tracks  ", tracks);
</script>

<div>
  <h2>Recently played songs</h2>
  <div class="recently-played">
    {#each tracks as { id, artist, title, trackUrl }}
      <a href={trackUrl} target="_blank">
        <div class="spotify-card__track__title">{artist} – {title}</div>
      </a>
    {/each}
  </div>
</div>

<style>
  a {
    text-decoration: none;
    color: var(--almost-red);
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--almost-red);
  }

  .recently-played {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
</style>
