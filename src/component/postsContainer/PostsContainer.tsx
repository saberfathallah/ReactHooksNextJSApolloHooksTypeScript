import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';

import GET_CURRENT_CATEGORY_ID from '@graphql/client/queries/getCurrentCategoryId';
import GET_USER_DETAILS from '@graphql/users/queries/getUserDetails';

import AllPosts from '../allPosts';
import PostsCategory from '../postsCategory';

const PostsContainer: React.FC<{}> = () => {
  const { data, loading: loadingUserDetails } = useQuery(GET_USER_DETAILS);
  const { data: { currentCategoryId }, loading } = useQuery(GET_CURRENT_CATEGORY_ID);

  if (loading || loadingUserDetails) return <p>laoding....</p>;
  const { getUserDetails: { user: userConnected } } = data;
  return (
    <>
      {
        currentCategoryId === ''
          ? <AllPosts userConnected={userConnected} />
          : <PostsCategory userConnected={userConnected} currentCategoryId={currentCategoryId} />
      }
    </>
  );
};

export default PostsContainer;
