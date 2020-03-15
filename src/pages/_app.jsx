import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch'
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'http://localhost:4002/graphql',
  fetch,
});
console.log("master");

function MyApp({ Component, pageProps }) {
    return (
    <ApolloProvider client={client}>
    <Component {...pageProps} />
    </ApolloProvider>
    )
  }
  export default MyApp
