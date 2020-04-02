import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';

import AllPosts from '../../component/allPosts';
import PostsCategory from '../../component/postsCategory';

import GET_CURRENT_CATEGORY_ID from '../../graphql/client/queries/getCurrentCategoryId';

const PostsContainer: React.FC<{}> = () => {
  const { data: { currentCategoryId }, loading } = useQuery(GET_CURRENT_CATEGORY_ID);
  if (loading) return <p>laoding....</p>;
    return ( 
      <>
        {
          currentCategoryId === '' ? <AllPosts /> : <PostsCategory currentCategoryId={currentCategoryId} />
        }
      </>
    )

}

export default PostsContainer;
