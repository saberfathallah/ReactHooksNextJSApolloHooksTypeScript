import { gql } from 'apollo-boost';

const CATEGORIES = gql`
  query {
    getAllCategoriesQuery {
      categories {
        name
        id
        level
        children {
          name
          id
          children {
            name
            id
            children {
              name
              id
            }
          }
        }
      }
    }
  }
`;

export default CATEGORIES;
