import { gql } from 'apollo-boost';

const GET_USER_DETAILS = gql`
  {
    getUserDetails {
      user {
        id
        email
        name
      }
    }
  }
`;

export default GET_USER_DETAILS;
