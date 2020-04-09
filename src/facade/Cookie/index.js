import Cookies from 'universal-cookie';

// TODO: use this variable intside the class.
let clientCookies;
class Cookie {
  constructor({ isServer, cookie }) {
    this.cookies = this.createCookies(isServer, cookie);
  }

  createCookies = (isServer, cookie) => {
    // SSR cookies must be created on each server request
    // TODO remove headers when update tests
    if (isServer && cookie) {
      return new Cookies(cookie);
    }

    // Client side cookies should be instantiated just once
    if (clientCookies) {
      return clientCookies;
    }

    const cookies = new Cookies();
    clientCookies = cookies;
    return cookies;
  };

  set = (name, value, options = {}) => this.cookies.set(name, value, options);

  get = (name) => this.cookies.get(name);

  remove = (name, options = {}) => this.cookies.remove(name, options);
}

export default Cookie;
