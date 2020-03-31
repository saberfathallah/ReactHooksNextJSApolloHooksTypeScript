import { gql } from 'apollo-boost';

const GET_ALL_POSTS = gql`
  {
    getAllPosts {
      posts{
        id
        description
        comments {
          description
        }
      }
    }
  }
`;

export default GET_ALL_POSTS;