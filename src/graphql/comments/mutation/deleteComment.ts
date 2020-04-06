import { gql } from 'apollo-boost';

import GET_POSTS_BY_CATEGORY_ID from '../../posts/getPostsByCategoryId';
import GET_ALL_POSTS from '../../posts/getAllPosts';

const DELETE_COMMENT = gql`
mutation deleteComment($deleteCommentInput: DeleteCommentInput) {
    deleteComment(deleteCommentInput:$deleteCommentInput) {
      commentId
      postId
    }
  }
`;

export const updateCacheAfterDeleteComment = (cache, data, currentCategoryId) => {
  if (currentCategoryId !== '') {
    const { getPostsByCategoryId } = cache.readQuery({
      query: GET_POSTS_BY_CATEGORY_ID,
      variables: { categoryId: currentCategoryId },
    });
    const cloneData = JSON.parse(JSON.stringify(getPostsByCategoryId))
    const index = cloneData.posts.findIndex(post => post.id === data.deleteComment.postId);
    const comments = cloneData.posts[index].comments.filter(comment => comment.id !== data.deleteComment.commentId);
    cloneData.posts[index].comments = comments;
    
    cache.writeQuery({  
      query: GET_POSTS_BY_CATEGORY_ID,
      variables: { categoryId: currentCategoryId },
      data: { getPostsByCategoryId: { ...cloneData, __typename: 'getPostsByCategoryId' } }
    });
  }

  const { getAllPosts } = cache.readQuery({
    query: GET_ALL_POSTS
  });
  const cloneAllPosts = JSON.parse(JSON.stringify(getAllPosts))

  const foundIndex = cloneAllPosts.posts.findIndex(post => post.id === data.deleteComment.postId);

  const comments = cloneAllPosts.posts[foundIndex].comments.filter(comment => comment.id !== data.deleteComment.commentId);
  cloneAllPosts.posts[foundIndex].comments = comments;
  
  cache.writeQuery({  
    query: GET_ALL_POSTS,
    data: { getAllPosts: { ...cloneAllPosts, __typename: 'Posts', } }
  });
};

export default DELETE_COMMENT;


