import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch'

// Instantiate required constructor fields
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4002/graphql',
  fetch: fetch,
});

const client = new ApolloClient({
  // Provide required constructor fields
  link,
  cache,

  // Provide some optional constructor fields
  name: 'react-web-client',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export default client;
