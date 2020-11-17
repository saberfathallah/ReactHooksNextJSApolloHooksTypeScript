import { gql } from 'apollo-boost';

import { LIMIT, FROM } from '@constants/posts';

import GET_ALL_POSTS from '../../posts/getAllPosts';
import GET_POSTS_BY_CATEGORY_ID from '../../posts/getPostsByCategoryId';

const ADD_COMMENT = gql`
  mutation addComment($commentInput: CommentInput) {
    addComment(commentInput: $commentInput) {
      comment {
        id
        postId
        description
        userId {
          name
          id
        }
      }
      error
    }
  }
`;
export const updateCacheAfterAddComment = (cache, data, currentCategoryId): void => {
  console.log("data", data)
  console.log("currentCategoryId", currentCategoryId)
  const existingAllPosts = cache.readQuery({
    variables: { from: FROM, limit: LIMIT },
    query: GET_ALL_POSTS,
  });

  if (currentCategoryId !== '') {
    const existingPostsByCurrentCategoryId = cache.readQuery({
      query: GET_POSTS_BY_CATEGORY_ID,
      variables: { categoryId: currentCategoryId },
    });
    const index = existingPostsByCurrentCategoryId.getPostsByCategoryId.posts.findIndex(
      (post) => post.id === data.addComment.comment.postId,
    );
    existingPostsByCurrentCategoryId.getPostsByCategoryId.posts[index].comments
      .push(data.addComment.comment);
    cache.writeQuery({
      query: GET_POSTS_BY_CATEGORY_ID,
      variables: { categoryId: currentCategoryId },
      data: { getPostsByCategoryId: { ...existingPostsByCurrentCategoryId.getPostsByCategoryId, __typename: 'getPostsByCategoryId' } },
    });
  }

  const foundIndex = existingAllPosts.getAllPosts.posts.findIndex(
    (post) => post.id === data.addComment.comment.postId,
  );

  existingAllPosts.getAllPosts.posts[foundIndex].comments.push(data.addComment.comment);
  cache.writeQuery({
    query: GET_ALL_POSTS,
    variables: { from: FROM, limit: LIMIT },
    data: { getAllPosts: { ...existingAllPosts.getAllPosts, __typename: 'Posts' } },
  });
};

export default ADD_COMMENT;
