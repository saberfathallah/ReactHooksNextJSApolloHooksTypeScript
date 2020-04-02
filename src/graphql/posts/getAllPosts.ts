import { gql } from 'apollo-boost';

const GET_ALL_POSTS = gql`
  {
    getAllPosts {
      posts{
        id
        description
        userId {
          name
        }
        comments {
          description
          userId {
            name
          }
        }
      }
    }
  }
`;

export default GET_ALL_POSTS;