
import { gql } from 'apollo-boost';

const SEARCH = gql`
query search($query: String) {
    search(query: $query) {
      posts { 
        likes
        userId {
          name
          id
        }
        comments { 
          description
          userId {
            name
          }
        }
        description
        id
       categoryId
      }
    }
  }
`;

export default SEARCH;
