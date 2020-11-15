import React from 'react';

import Post from '../post';
import { User } from '../../types/user';
import { PostType } from '../../types/post'; 
interface PostsResponse {
  getPostsByCategoryId: PostsType;
}

interface PostsType {
  posts: PostType[];
}
interface PostsCategory {
  userConnected: User;
  data: PostsResponse,
  loading: boolean,
}

const PostsCategory: React.FC<PostsCategory> = (props: PostsCategory) => {
  const { userConnected, loading, data } = props;

  if (loading) return <p>loading...</p>;

  return (
    <div>
      {
        data.getPostsByCategoryId.posts.map((
          {
            userId: { name, id: creatorId },
            description,
            comments,
            id,
            categoryId,
            likes,
          },
        ) => (
          <div key={id}>
            <Post
              likes={likes}
              creatorId={creatorId}
              userConnected={userConnected}
              categoryId={categoryId}
              postId={id}
              userName={name}
              description={description}
              comments={comments}
            />
          </div>
        ))
      }
    </div>
  );
};

export default PostsCategory;
