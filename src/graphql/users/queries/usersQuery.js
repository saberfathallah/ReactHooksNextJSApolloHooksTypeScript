import { gql } from 'apollo-boost';

const USERS = gql`
  {
    users {
      users {
        name
        email
      }
    }
  }
`;

export default USERS;
