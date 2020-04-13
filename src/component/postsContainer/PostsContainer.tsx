import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';

import GET_SEARCH_QUERY from '@graphql/client/queries/getSearchQuery';
import GET_CURRENT_CATEGORY_ID from '@graphql/client/queries/getCurrentCategoryId';
import GET_USER_DETAILS from '@graphql/users/queries/getUserDetails';

import ContentSearch from '../contentSearch';
import AllPosts from '../allPosts';
import PostsCategory from '../postsCategory';

const PostsContainer: React.FC<{}> = () => {
  const { data, loading: loadingUserDetails } = useQuery(GET_USER_DETAILS);
  const { data: { currentCategoryId }, loading } = useQuery(GET_CURRENT_CATEGORY_ID);
  const { data: dataSearchQuery, loading: loadingSearchQuery } = useQuery(GET_SEARCH_QUERY);

  if (loading || loadingUserDetails || loadingSearchQuery) return <p>laoding....</p>;

  const { getUserDetails: { user: userConnected } } = data;

  if (dataSearchQuery && dataSearchQuery.query) {
    return (
      <ContentSearch
        dataSearchQuery={dataSearchQuery}
        userConnected={userConnected}
      />
    );
  }

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
