import { gql } from 'apollo-boost';

const GET_POSTS_BY_USER_ID = gql`
query {
  getPostsByUserId {
    posts {
      description
      userId {
        name
      }
      comments {
        postId
        description
      }
      categoryId
    }
    error
  }
}
`;

export default GET_POSTS_BY_USER_ID;