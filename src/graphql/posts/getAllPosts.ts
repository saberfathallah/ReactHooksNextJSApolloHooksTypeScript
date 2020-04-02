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
        }
        comments {
          postId
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