import React, { useState } from "react";

import { useQuery } from "../../hooks/useQuery";
import GET_ALL_POSTS from "@graphql/posts/getAllPosts";
import { LIMIT, FROM } from "@constants/posts";
import AllPosts from "./AllPosts";
import { User } from "../../types/user";

export interface AllPostsProps {
  userConnected: User;
}

const AllPostsContainer = (props: AllPostsProps) => {
  const [page, setPage] = useState(1);
  const { userConnected } = props;
  const { data, loading, fetchMore } = useQuery(GET_ALL_POSTS, {
    variables: { from: FROM, limit: LIMIT },
  });

  const fetchMorePost = (_event, value): void => {
    if (value > page) {
      fetchMore({
        variables: {
          offset: data.getAllPosts.totalPosts,
          from: page * LIMIT,
          limit: (value - page) * LIMIT,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            ...fetchMoreResult,
            getAllPosts: {
              posts: [
                ...prev.getAllPosts.posts,
                ...fetchMoreResult.getAllPosts.posts,
              ],
              __typename: "Posts",
            },
          };
        },
      });
      setPage(value);
    }
  };

  return (
    <AllPosts
      page={page}
      userConnected={userConnected}
      loading={loading}
      fetchMorePost={fetchMorePost}
      data={data}
    />
  );
};

export default AllPostsContainer;
