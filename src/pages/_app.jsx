import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch'
import { ApolloProvider } from '@apollo/react-hooks';

import buildCookies from '../services/cookies';
import { USER_NAME, TOKEN_COOKIE } from '../constants/cookies';
import { UserProvider } from '../context/userContext';

const token = buildCookies().get(TOKEN_COOKIE);

const client = new ApolloClient({
  clientState: {
    defaults: {
      currentCategoryId: '',
    },
    resolvers: {
      Mutation: {
        changeCurrentCategory: (_, { currentCategoryId}, { cache }) => {
          cache.writeData({ data: { currentCategoryId }});
          return null;
        }
      }
    }
  },
  request: operation => {

    operation.setContext({
      headers: {
        authorization: token || '',
      },
    })
  },
  uri: 'http://localhost:4002/graphql',
  fetch,
});

function MyApp({ Component, pageProps }) {
    const isAuth = !!token;
    const userName = buildCookies().get(USER_NAME);

    return (
    <UserProvider
      isAuth={isAuth}
      userName={userName}
    >
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
    )
  }
  export default MyApp
