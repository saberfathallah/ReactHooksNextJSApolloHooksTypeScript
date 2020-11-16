import * as React from "react";

import ContentSearch from "../contentSearch";
import AllPosts from "../allPosts";
import PostsCategory from "../postsCategory";
import { User } from "../../types/user";
interface PostsContainerProps {
  currentCategoryId: string;
  data: { getUserDetails: { user: User } };
  dataSearchQuery: { query: string } | undefined;
  loading: boolean;
  loadingSearchQuery: boolean;
  loadingUserDetails: boolean;
}

const PostsContainer: React.FC<PostsContainerProps> = (props: PostsContainerProps) => {

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
