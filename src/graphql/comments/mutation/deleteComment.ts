import { gql } from 'apollo-boost';

const DELETE_COMMENT = gql`
mutation deleteComment($deleteCommentInput: DeleteCommentInput) {
    deleteComment(deleteCommentInput:$deleteCommentInput) {
      commentId
      postId
    }
  }
`

export default DELETE_COMMENT;


