import * as React from 'react';

import Login from '../component/login';
import buildCookies from '../services/cookies';
import TOKEN_COOKIE from '../constants/cookies';

const HomePage: React.FC<{}> = () => {
  const token = buildCookies().get(TOKEN_COOKIE);
  if (token) {
    return <p>connected</p>
  }
  return <Login />
}

export default HomePage;
