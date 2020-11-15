import * as React from "react";

import ContentSearch from "../contentSearch";
import AllPosts from "../allPosts";
import PostsCategory from "../postsCategory";

const PostsContainer: React.FC<any> = (props:any) => {
  const {
    loadingUserDetails,
    data,
    loading,
    loadingSearchQuery,
    dataSearchQuery,
    currentCategoryId,
  } = props;

  if (loading || loadingUserDetails || loadingSearchQuery)
    return <p>laoding....</p>;

  const {
    getUserDetails: { user: userConnected },
  } = data;

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
      {currentCategoryId === "" ? (
        <AllPosts userConnected={userConnected} />
      ) : (
        <PostsCategory
          userConnected={userConnected}
          currentCategoryId={currentCategoryId}
        />
      )}
    </>
  );
};

export default PostsContainer;
