import React, { useEffect, useState } from 'react'

const getSpotifySongs = async () => {
  const response = await fetch('/api/spotify');
  const data = await response.json();
  return data.items;
};

const ReactSpotifyCard = () => {
    const [formattedTracks, setFormattedTracks] = useState([]);

  useEffect(() => {
    const fetchSpotifySongs = async () => {
      const songs = await getSpotifySongs();
      const tracks = songs.map(({ track }) => ({
        artist: track.artists.map((_artist) => _artist.name).join(', '),
        title: track.name,
        trackUrl: track.external_urls.spotify,
      }));
      setFormattedTracks(tracks);
    };

    fetchSpotifySongs();
  }, []);

  console.log(formattedTracks);
    return (
        <>
        <div>Spotify Card</div>
        </>
    )
}

export { ReactSpotifyCard };
