import { gql } from 'apollo-boost';

const GET_ALL_POSTS = gql`
query 
getAllPosts($from: Int, $limit: Int) {
  getAllPosts(from: $from, limit: $limit) {
    posts {
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
    totalPosts
  }
}
`;

export default GET_ALL_POSTS;
