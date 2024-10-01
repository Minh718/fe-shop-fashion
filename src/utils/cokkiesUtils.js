import Cookies from 'js-cookie';

export const setCookieSecure = ({ accessToken, refreshToken }) => {
  Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'strict' });
  Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'strict' });
};