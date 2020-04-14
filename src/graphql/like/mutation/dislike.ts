import { gql } from 'apollo-boost';

import { LIMIT, FROM } from '@constants/posts';

import GET_POSTS_BY_CATEGORY_ID from '../../posts/getPostsByCategoryId';
import GET_ALL_POSTS from '../../posts/getAllPosts';

const DISLIKE = gql`
  mutation dislike($postId: ID) {
    dislike(postId: $postId) {
      postId
      userId
      error
    }
  }
`;

export const updateCacheAfterDislike = (cache, data, currentCategoryId): void => {
  if (currentCategoryId !== '') {
    const { getPostsByCategoryId } = cache.readQuery({
      query: GET_POSTS_BY_CATEGORY_ID,
      variables: { categoryId: currentCategoryId },
    });
    const cloneData = JSON.parse(JSON.stringify(getPostsByCategoryId));
    const index = cloneData.posts.findIndex(
      (post) => post.id === data.dislike.postId,
    );
    const likes = cloneData.posts[index].likes.filter(
      (like) => like !== data.dislike.userId,
    );
    cloneData.posts[index].likes = likes;

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

  const foundIndex = cloneAllPosts.posts.findIndex((post) => post.id === data.dislike.postId);

  const likes = cloneAllPosts.posts[foundIndex].likes.filter(
    (like) => like !== data.dislike.userId,
  );
  cloneAllPosts.posts[foundIndex].likes = likes;

  cache.writeQuery({
    variables: { from: FROM, limit: LIMIT },
    query: GET_ALL_POSTS,
    data: { getAllPosts: { ...cloneAllPosts, __typename: 'Posts' } },
  });
};

export default DISLIKE;
