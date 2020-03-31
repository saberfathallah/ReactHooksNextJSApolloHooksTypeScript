import { gql } from 'apollo-boost';

const CATEGORIES = gql`
  query {
    getAllCategoriesQuery {
      categories {
        name
        id
        level
      }
    }
  }
`;

export default CATEGORIES;
