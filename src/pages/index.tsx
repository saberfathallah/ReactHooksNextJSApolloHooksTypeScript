import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { useQuery } from '@apollo/react-hooks';

import Navbar from '../component/navbar';
import Login from '../component/login';
import Categories from '../component/categories';
import PostsContainer from '../component/postsContainer';
import buildCookies from '../services/cookies';
import TOKEN_COOKIE from '../constants/cookies';
import GET_CURRENT_CATEGORY_ID from '../graphql/client/queries/getCurrentCategoryId';

const HomePage: React.FC<{}> = () => {
  const token = buildCookies().get(TOKEN_COOKIE);
  
  if (token) {
    return ( 
      <div>
        <Navbar />
        <Grid container>
          <Grid style={{ textAlign: 'center' }} item xs={12} sm={3}>
            <Categories />
          </Grid>
          <Grid style={{ textAlign: 'center' }} item xs={12} sm={9}>
            <PostsContainer />
          </Grid>
        </Grid>
      </div>
    )
  }
  return <Login />
}

export default HomePage;
