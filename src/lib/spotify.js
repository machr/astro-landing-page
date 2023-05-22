const client_id = import.meta.env.SPOTIFY_CLIENT_ID
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET
const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const encoded = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
// const scope = 'user-read-recently-played'

export const getAccessToken = async () => {
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
    })

    return response.json()
}
const LAST_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;


export const getLastPlayedTracks = async (limit ) => {
    let songLimit = limit ? limit : 10;
    const { access_token } = await getAccessToken()    
    return fetch(`${LAST_PLAYED_ENDPOINT}?limit=${songLimit}`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        },

    })
}

