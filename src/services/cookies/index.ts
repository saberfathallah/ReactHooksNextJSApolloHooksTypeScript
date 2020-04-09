import Cookie from '@facade/Cookie';
import isBrowser from '@utils/isBrowser';

const buildCookies = (context = null): any => {
  const isServer = !isBrowser();
  const cookie = (context && context.headers && context.headers.cookie) || null;

  const cookies = new Cookie({ isServer, cookie });

  return cookies;
};

export default buildCookies;
