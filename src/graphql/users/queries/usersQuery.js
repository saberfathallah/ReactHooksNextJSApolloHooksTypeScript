import { gql } from 'apollo-boost';

const USERS = gql`
  {
    users {
      users {
        name
        password
        email
      }
    }
  }
`;

export default USERS;
