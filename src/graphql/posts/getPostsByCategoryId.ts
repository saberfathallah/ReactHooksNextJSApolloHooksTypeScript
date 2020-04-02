import { gql } from 'apollo-boost';

const GET_POSTS_BY_CATEGORY_ID = gql`
query getPostsByCategoryId($categoryId: ID) {
  getPostsByCategoryId(categoryId: $categoryId) {
    posts {
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
      description
      id
      categoryId
    }
  }
}
`;

export default GET_POSTS_BY_CATEGORY_ID;