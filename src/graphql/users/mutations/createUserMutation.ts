import { gql } from 'apollo-boost';

import USERS from '../queries/usersQuery';

const CREATE_USER = gql`
  mutation createUsere($userInput: UserInput) {
    createUser(userInput: $userInput) {
      user {
        email
        name
      }
      error
    }
  }
`;

export const updateCacheAfterCreateUser = (cache, { data }): void => {
  const existingUsers = cache.readQuery({
    query: USERS,
  });
  cache.writeQuery({
    query: USERS,
    data: { users: { users: [...existingUsers.users.users, data.createUser.user] } },
  });
};

export default CREATE_USER;
