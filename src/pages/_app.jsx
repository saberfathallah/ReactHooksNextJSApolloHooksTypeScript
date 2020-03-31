import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch'
import { ApolloProvider } from '@apollo/react-hooks';

import buildCookies from '../services/cookies';
import TOKEN_COOKIE from '../constants/cookies';

const client = new ApolloClient({
  request: operation => {
    const token = buildCookies().get(TOKEN_COOKIE);

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
    return (
    <ApolloProvider client={client}>
    <Component {...pageProps} />
    </ApolloProvider>
    )
  }
  export default MyApp
