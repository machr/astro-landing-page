var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var spotify_exports = {};
__export(spotify_exports, {
  getAccessToken: () => getAccessToken,
  getLastPlayedTracks: () => getLastPlayedTracks,
  handler: () => handler
});
module.exports = __toCommonJS(spotify_exports);
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const encoded = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const LAST_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${encoded}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token
    })
  });
  return response.json();
};
const getLastPlayedTracks = async (limit) => {
  let songLimit = limit ? limit : 10;
  const { access_token } = await getAccessToken();
  return fetch(`${LAST_PLAYED_ENDPOINT}?limit=${songLimit}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
const handler = async () => {
  const response = await getLastPlayedTracks(10);
  const data = response.data;
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAccessToken,
  getLastPlayedTracks,
  handler
});
