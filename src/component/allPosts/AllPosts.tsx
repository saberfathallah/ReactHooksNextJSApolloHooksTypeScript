import React from "react";

import Post from "../post";
import PaginationControlled from "../pagination";
import { Posts } from "../../types/post";
import { User } from "../../types/user";
interface PostsResponse {
  getAllPosts: Posts;
}

interface AllPostsProps {
  userConnected: User;
  page: number;
  loading: boolean;
  fetchMorePost: (_event: any, value: number) => void;
  data: PostsResponse | undefined;
}

const AllPosts: React.FC<AllPostsProps> = (props: AllPostsProps) => {
  const { userConnected, page, loading, fetchMorePost, data } = props;

  if (loading) return <p>loading...</p>;
  const {
    getAllPosts: { totalPosts, posts },
  } = data;

  return (
    <div>
      {posts.map(
        ({
          userId: { name, id: creatorId },
          description,
          comments,
          id,
          categoryId,
          likes,
        }) => (
          <div key={id}>
            <Post
              likes={likes}
              creatorId={creatorId}
              userConnected={userConnected}
              postId={id}
              categoryId={categoryId}
              userName={name}
              description={description}
              comments={comments}
            />
          </div>
        )
      )}
      <PaginationControlled
        fetchMorePost={fetchMorePost}
        page={page}
        totalPosts={totalPosts}
      />
    </div>
  );
};

export default AllPosts;
