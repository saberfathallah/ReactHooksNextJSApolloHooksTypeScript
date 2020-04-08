import { gql } from 'apollo-boost';

const GET_POSTS_BY_USER_ID = gql`
query {
  getPostsByUserId {
    posts {
      userId {
        name
        id
      }
      comments {
        id
        postId
        description
        userId {
          name
          id
        }
      }
      description
      id
      categoryId
    }
    error
  }
}
`;

export default GET_POSTS_BY_USER_ID;