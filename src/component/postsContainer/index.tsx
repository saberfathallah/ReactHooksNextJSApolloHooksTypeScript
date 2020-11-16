import React from "react";
import PostsContainer from "./PostsContainer";

import { useQuery } from "../../hooks/useQuery";
import GET_SEARCH_QUERY from "@graphql/client/queries/getSearchQuery";
import GET_CURRENT_CATEGORY_ID from "@graphql/client/queries/getCurrentCategoryId";
import GET_USER_DETAILS from "@graphql/users/queries/getUserDetails";

const PostContainerContainer = () => {
  const { data, loading: loadingUserDetails } = useQuery(GET_USER_DETAILS);
  const {
    data: { currentCategoryId },
    loading,
  } = useQuery(GET_CURRENT_CATEGORY_ID);
  const {
    data: dataSearchQuery,
    loading: loadingSearchQuery,
  } = useQuery(GET_SEARCH_QUERY);

  return (
    <PostsContainer
      loadingUserDetails={loadingUserDetails}
      loading={loading}
      loadingSearchQuery={loadingSearchQuery}
      currentCategoryId={currentCategoryId}
      dataSearchQuery={dataSearchQuery}
      data={data}
    />
  );
};

export default PostContainerContainer;
