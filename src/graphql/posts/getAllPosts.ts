import { gql } from 'apollo-boost';

const GET_ALL_POSTS = gql`
  {
    getAllPosts {
      posts{
        description
        comments {
          description
        }
      }
    }
  }
`;

export default GET_ALL_POSTS;