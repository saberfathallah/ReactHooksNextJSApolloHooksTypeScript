import * as React from 'react';
import Grid from '@material-ui/core/Grid';

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
        <Grid container>
          <Grid style={{ textAlign: 'center' }} item xs={12} sm={3}>
            <Categories />
          </Grid>
          <Grid style={{ textAlign: 'center' }} item xs={12} sm={9}>
            <AllPosts />
          </Grid>
        </Grid>
      </div>
    )
  }
  return <Login />
}

export default HomePage;
