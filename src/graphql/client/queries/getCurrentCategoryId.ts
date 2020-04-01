import { gql } from 'apollo-boost';

const GET_CURRENT_CATEGORY_ID = gql`
  query {
    currentCategoryId @client 
  }
`;

export default GET_CURRENT_CATEGORY_ID;
