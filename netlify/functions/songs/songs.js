// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
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
  try {
    const response = await fetch(`${LAST_PLAYED_ENDPOINT}?limit=${songLimit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    console.log(data); // Log the entire response
    
    return data;
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
};


const handler = async (event) => {
  try {
    const { access_token } = await getAccessToken()
    const response = await getLastPlayedTracks(access_token)
    console.log(response.data)
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
