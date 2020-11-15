import React from "react";

import Post from "../post";
import { User } from '../../types/user';
import { CommentType } from '../../types/comment'
interface PostsResponse {
  search: PostsType;
}

interface PostsType {
  posts: PostType[];
}

interface PostType {
  userId: User;
  categoryId: string;
  comments: CommentType[];
  description: string;
  id: string;
  creatorId: string;
  likes: string[];
}

interface ContentSearchProps {
  data: PostsResponse | undefined;
  userConnected: User;
  loading: boolean;
}

const ContentSearch: React.FC<ContentSearchProps> = (
  props: ContentSearchProps
) => {
  const { loading, data, userConnected } = props;

  if (loading) return <p>loading...</p>;

  return (
    <div>
      {data.search.posts.map(
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
              creatorId={creatorId}
              userConnected={userConnected}
              categoryId={categoryId}
              postId={id}
              userName={name}
              description={description}
              comments={comments}
              likes={likes}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ContentSearch;
