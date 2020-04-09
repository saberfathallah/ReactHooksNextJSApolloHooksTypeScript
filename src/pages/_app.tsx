/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-props-no-spreading */
import ApolloClient from 'apollo-boost';
import fetch from 'node-fetch';
import { ApolloProvider } from '@apollo/react-hooks';

import Navbar from '../component/navbar';
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
        changeCurrentCategory: (_, { currentCategoryId }, { cache }): null => {
          cache.writeData({ data: { currentCategoryId } });
          return null;
        },
      },
    },
  },
  request: (operation): void => {
    operation.setContext({
      headers: {
        authorization: token || '',
      },
    });
  },
  uri: 'http://localhost:4002/graphql',
  fetch,
});
// eslint-disable-next-line react/prop-types
const MyApp: React.FC<any> = ({ Component, pageProps }): any => {
  const isAuth = !!token;
  const userName = buildCookies().get(USER_NAME);

  return (
    <UserProvider
      isAuth={isAuth}
      userName={userName}
    >
      <ApolloProvider client={client}>
        <Navbar />
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  );
};
export default MyApp;
