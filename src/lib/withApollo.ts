
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import buildCookies from '@services/cookies';

import { TOKEN_COOKIE } from '@constants/cookies';

function createClient(ctx): any {
  const token = buildCookies(ctx).get(TOKEN_COOKIE);

  return new ApolloClient({
    uri: 'http://localhost:4002/graphql',
    request: (operation): void => {
      operation.setContext({
        headers: {
          authorization: token || '',
          cookie: ctx.headers && ctx.headers.cookie, // NOTE: client-side headers is undefined!
        },
      });
    },
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
  });
}

export default withApollo(createClient);
