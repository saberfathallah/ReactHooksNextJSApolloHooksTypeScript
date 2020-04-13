import { gql } from 'apollo-boost';

const CHANGE_SEARCH_QUERY = gql`
  mutation changeSearchQuery($query: String) {
    changeSearchQuery(query: $query) @client
  }
`;

export default CHANGE_SEARCH_QUERY;
