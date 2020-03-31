import * as React from 'react';

import Login from '../component/login';
import Categories from '../component/categories';
import AllPosts from '../component/allPosts';
import buildCookies from '../services/cookies';
import TOKEN_COOKIE from '../constants/cookies';

const HomePage: React.FC<{}> = () => {
  const token = buildCookies().get(TOKEN_COOKIE);
  if (token) {
    return ( 
      <div>
        <p>connected</p>
        <Categories />
        <AllPosts />
      </div>
    )
  }
  return <Login />
}

export default HomePage;
