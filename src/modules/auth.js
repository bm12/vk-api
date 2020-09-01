import { getFromLocalStorage, setToLocalStorage } from '@/utils/storage';
import { vkApiScopes, VK_API_VERSION } from '@/services/constants';
import { templateParser } from '@/utils/format-strings';

const AUTH_DATA_KEY = 'vkApiAuthData';

const urlParamsKeys = {
  accessToken: 'access_token',
  expiresIn: 'expires_in',
  userId: 'user_id',
};

const createAuthDataObj = (accessToken, expiresIn, timestamp = Date.now()) => ({
  accessToken,
  expiresIn,
  timestamp,
});

const isExpirationValid = ({ expiresIn, timestamp }) => {
  if (expiresIn === 0) return true;
  if (!timestamp) return false;

  if ((Date.now() - timestamp) > (expiresIn * 1000)) return false;

  return true;
};

const getAuthFromUrl = () => {
  const params = new URLSearchParams(window.location.hash.slice(1));

  if (params.has(urlParamsKeys.accessToken)) {
    return createAuthDataObj(params.get(urlParamsKeys.accessToken), params.get(urlParamsKeys.expiresIn));
  }
};

export const authStatuses = {
  authed: 'authed',
  notAuthed: 'not-authed',
};

export const getAuthData = () => {
  let authData = getFromLocalStorage(AUTH_DATA_KEY);
  if (authData && isExpirationValid(authData)) return authData;

  authData = getAuthFromUrl();
  if (authData && isExpirationValid(authData)) {
    setToLocalStorage(AUTH_DATA_KEY, authData);
    return authData;
  }
};

export const getAccessToken = () => getAuthData().accessToken;

export const getAuthStatus = () => {
  const authData = getAuthData();

  return authData ? authStatuses.authed : authStatuses.notAuthed;
};

const redirectUrlTemplate = [
  'https://oauth.vk.com/authorize?',
  'client_id={{clientId}}',
  '&display=page',
  '&redirect_uri={{returnUrl}}',
  '&scope={{scope}}',
  '&response_type=token',
  '&v={{version}}',
].join('');

export const getRedirectUrl = (returnUrl = window.location.href) => {
  const scopes = Object.values(vkApiScopes).join(',');
  const urlObj = new URL(returnUrl);
  urlObj.hash = '';

  const redirectUrl = templateParser(redirectUrlTemplate, {
    clientId: process.env.CLIENT_ID,
    returnUrl: encodeURIComponent(urlObj.toString()),
    scope: scopes,
    version: VK_API_VERSION,
  });

  return redirectUrl;
};

export const redirectToAuth = (returnUrl) => {
  const redirectUrl = getRedirectUrl(returnUrl);

  window.location.assign(redirectUrl);
};
