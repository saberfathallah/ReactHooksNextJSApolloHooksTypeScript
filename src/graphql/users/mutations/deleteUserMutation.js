import { gql } from 'apollo-boost';

import USERS from '../queries/usersQuery';

const DELETE_USER = gql`
  mutation deleteUser($email: String) {
    deleteUser(email: $email) {
      user {
        email
        name
      }
      error
    }
  }
`

export const updateCacheAfterDeleteUser = (cache, { data }) => {
  const existingUsers= cache.readQuery({
    query: USERS
  });
  cache.writeQuery({  
    query: USERS,
    data: { users: { users: existingUsers.users.users.filter(user => user.email !==  data.deleteUser.user.email) } }
  });
};

export default DELETE_USER;