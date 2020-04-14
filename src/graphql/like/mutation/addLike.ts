import { gql } from 'apollo-boost';

import { LIMIT, FROM } from '@constants/posts';

import GET_ALL_POSTS from '../../posts/getAllPosts';
import GET_POSTS_BY_CATEGORY_ID from '../../posts/getPostsByCategoryId';

const ADD_LIKE = gql`
mutation addLike($postId: ID){
  addLike(postId: $postId){
    postId
    userId
    error
  }
}
`;

export const updateCacheAfterAddLike = (cache, data, currentCategoryId): void => {
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
      (post) => post.id === data.addLike.postId,
    );
    existingPostsByCurrentCategoryId.getPostsByCategoryId.posts[index].likes
      .push(data.addLike.userId);
    cache.writeQuery({
      query: GET_POSTS_BY_CATEGORY_ID,
      variables: { categoryId: currentCategoryId },
      data: {
        getPostsByCategoryId:
         {
           ...existingPostsByCurrentCategoryId.getPostsByCategoryId,
           __typename: 'getPostsByCategoryId',
         },
      },
    });
  }

  const foundIndex = existingAllPosts.getAllPosts.posts.findIndex(
    (post) => post.id === data.addLike.postId,
  );

  existingAllPosts.getAllPosts.posts[foundIndex].likes.push(data.addLike.userId);
  cache.writeQuery({
    query: GET_ALL_POSTS,
    variables: { from: FROM, limit: LIMIT },
    data: { getAllPosts: { ...existingAllPosts.getAllPosts, __typename: 'Posts' } },
  });
};

export default ADD_LIKE;
