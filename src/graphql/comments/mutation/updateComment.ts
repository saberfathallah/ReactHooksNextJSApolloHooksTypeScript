import { gql } from 'apollo-boost';

import { LIMIT, FROM } from '@constants/posts';

import GET_POSTS_BY_CATEGORY_ID from '../../posts/getPostsByCategoryId';
import GET_ALL_POSTS from '../../posts/getAllPosts';

const UPDATE_COMMENT = gql`
mutation updateComment($updateCommentInput: UpdateCommentInput) {
  updateComment(updateCommentInput:$updateCommentInput) {
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

export const updateCacheAfterUpdateComment = (cache, data, currentCategoryId): void => {
  if (currentCategoryId !== '') {
    const { getPostsByCategoryId } = cache.readQuery({
      query: GET_POSTS_BY_CATEGORY_ID,
      variables: { categoryId: currentCategoryId },
    });
    const cloneData = JSON.parse(JSON.stringify(getPostsByCategoryId));
    const index = cloneData.posts.findIndex(
      (post) => post.id === data.updateComment.comment.postId,
    );
    const comments = cloneData.posts[index].comments.map((comment) => {
      if (comment.id === data.updateComment.comment.id) {
        return {
          ...comment,
          description: data.updateComment.comment.description,
        };
      }
      return comment;
    });
    cloneData.posts[index].comments = comments;

    cache.writeQuery({
      query: GET_POSTS_BY_CATEGORY_ID,
      variables: { categoryId: currentCategoryId },
      data: { getPostsByCategoryId: { ...cloneData, __typename: 'getPostsByCategoryId' } },
    });
  }

  const { getAllPosts } = cache.readQuery({
    variables: { from: FROM, limit: LIMIT },
    query: GET_ALL_POSTS,
  });
  const cloneAllPosts = JSON.parse(JSON.stringify(getAllPosts));
  const foundIndex = cloneAllPosts.posts.findIndex(
    (post) => post.id === data.updateComment.comment.postId,
  );
  const comments = cloneAllPosts.posts[foundIndex].comments.map((comment) => {
    if (comment.id === data.updateComment.comment.id) {
      return {
        ...comment,
        description: data.updateComment.comment.description,
      };
    }
    return comment;
  });

  cloneAllPosts.posts[foundIndex].comments = comments;

  cache.writeQuery({
    variables: { from: FROM, limit: LIMIT },
    query: GET_ALL_POSTS,
    data: { getAllPosts: { ...cloneAllPosts, __typename: 'Posts' } },
  });
};

export default UPDATE_COMMENT;
