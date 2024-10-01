export const oAuthConfig = {
    clientId: process.env.REACT_APP_CLIENT_GOOGLE_ID,
    redirectUri: process.env.REACT_APP_URL_FE + process.env.REACT_APP_REDIRECT_GOOGLE_URI,
    authUri: process.env.REACT_APP_AUTH_URI,
};
