import { gql } from 'apollo-boost';

const GET_SEARCH_QUERY = gql`
  query {
    query @client 
  }
`;

export default GET_SEARCH_QUERY;
