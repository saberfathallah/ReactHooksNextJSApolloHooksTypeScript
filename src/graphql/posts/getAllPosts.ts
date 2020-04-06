import { gql } from 'apollo-boost';

const GET_ALL_POSTS = gql`
  {
    getAllPosts {
      posts{
        id
        categoryId
        description
        userId {
          name
          id
        }
        comments {
          id
          postId
          description
          userId {
            id
            name
          }
        }
      }
    }
  }
`;

export default GET_ALL_POSTS;