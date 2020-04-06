import { gql } from 'apollo-boost';

import GET_ALL_POSTS from '../../posts/getAllPosts';
import GET_POSTS_BY_CATEGORY_ID from '../../posts/getPostsByCategoryId';

const ADD_COMMENT = gql`
  mutation addComment($commentInput: CommentInput) {
    addComment(commentInput: $commentInput) {
      comment {
        postId
        userId {
          name
          id
        }
        description
      }
      error
    }
  }
`
export const updateCacheAfterAddComment = (cache, data, currentCategoryId) => {
  const existingAllPosts = cache.readQuery({
    query: GET_ALL_POSTS
  });
  
  if (currentCategoryId !== '') {
    const existingPostsByCurrentCategoryId = cache.readQuery({
      query: GET_POSTS_BY_CATEGORY_ID,
      variables: { categoryId: currentCategoryId },
    });
    const index = existingPostsByCurrentCategoryId.getPostsByCategoryId.posts.findIndex(post => post.id === data.addComment.comment.postId);
    existingPostsByCurrentCategoryId.getPostsByCategoryId.posts[index].comments.push(data.addComment.comment);
    cache.writeQuery({  
      query: GET_POSTS_BY_CATEGORY_ID,
      variables: { categoryId: currentCategoryId },
      data: { getPostsByCategoryId: { ...existingPostsByCurrentCategoryId, __typename: 'getPostsByCategoryId' } }
    });
  }

const foundIndex = existingAllPosts.getAllPosts.posts.findIndex(post => post.id === data.addComment.comment.postId);

existingAllPosts.getAllPosts.posts[foundIndex].comments.push(data.addComment.comment);
cache.writeQuery({  
  query: GET_ALL_POSTS,
  data: { getAllPosts: { ...existingAllPosts, __typename: 'Posts', } }
});

};

export default ADD_COMMENT;