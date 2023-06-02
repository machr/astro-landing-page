import fetch from 'node-fetch';
const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const encoded = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const LAST_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;

const handler = async () =>  {
    try {
      const { access_token } = await getAccessToken()
      const response = await getLastPlayedTracks(access_token)
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": '*',
        },
        body: JSON.stringify(response)
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify(err.message)
      }
    }
  };

  export const getAccessToken = async () => {
    try {
      const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${encoded}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token,
        }),
      });
  
      return response.json();
    } catch (err) {
      console.error(err);
      throw err; // Throw the error to be caught by the calling function
    }
  };



  export const getLastPlayedTracks = async (token, limit) => {
    let songLimit = limit ? limit : 10;
    const response = await fetch(`${LAST_PLAYED_ENDPOINT}?limit=${songLimit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await response.json();  
    return data;
  };

export { handler };