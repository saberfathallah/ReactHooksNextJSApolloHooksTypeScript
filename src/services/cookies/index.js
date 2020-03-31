import Cookie from "../../facade/Cookie";
import isBrowser from "../../utils/isBrowser";

const buildCookies = (context = null) => {
  const isServer = !isBrowser();
  const cookie = (context && context.req && context.req.headers.cookie) || null;
  const cookies = new Cookie({ isServer, cookie });

  return cookies;
};

export default buildCookies;
