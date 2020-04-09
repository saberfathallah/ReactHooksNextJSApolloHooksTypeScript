/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { ApolloProvider } from '@apollo/react-hooks';
import buildCookies from '@services/cookies';
import withApolloClient from '@lib/withApollo';

import Navbar from '@component/navbar';
import { USER_NAME, TOKEN_COOKIE } from '@constants/cookies';
import { UserProvider } from '@context/userContext';

const token = buildCookies().get(TOKEN_COOKIE);
const MyApp: React.FC<any> = ({ Component, pageProps, apollo }): any => {
  const isAuth = !!token;
  const userName = buildCookies().get(USER_NAME);

  return (
    <UserProvider
      isAuth={isAuth}
      userName={userName}
    >
      <ApolloProvider client={apollo}>
        <Navbar />
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  );
};

export default withApolloClient(MyApp);
