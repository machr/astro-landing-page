import React, { useEffect, useState } from 'react'

const getSpotifySongs = async () => {
  const response = await fetch('/api/spotify');
  const data = await response.json();
  console.log(data)
  return data.items;
};

const ReactSpotifyCard = () => {
    const [formattedTracks, setFormattedTracks] = useState([]);

  useEffect(() => {
    const fetchSpotifySongs = async () => {
      const songs = await getSpotifySongs();
      const tracks = songs.map(({ track }) => ({
        id: track.id,
        artist: track.artists.map((_artist) => _artist.name).join(', '),
        title: track.name,
        trackUrl: track.external_urls.spotify,
      }));
      setFormattedTracks(tracks);
    };

    fetchSpotifySongs();
  }, []);

  const showSongsList = (songs) => {
    return (
      songs.map(song => 
        <li key={song.id}><a href={song.trackUrl}>{song.artist} - {song.title}</a></li>
      )
    )
  }

  return formattedTracks.length > 0 && (
      <div>
        <h4>Last played songs</h4>
        <ul>
          {showSongsList(formattedTracks)}
        </ul>
      </div>
      
  )
}

export { ReactSpotifyCard };
