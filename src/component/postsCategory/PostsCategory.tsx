import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import GET_POSTS_BY_CATEGORY_ID from '@graphql/posts/getPostsByCategoryId';

import Post from '../post';

interface PostsResponse {
  getPostsByCategoryId: PostsType;
}

interface PostsType {
  posts: PostType[];
}

interface Comment {
  description: string;
  userId: User;
  postId: string;
  id: string;
}

interface User {
  name: string;
  id: string;
}

interface PostType {
  userId: User;
  categoryId: string;
  postId: string;
  comments: Comment[];
  description: string;
  id: string;
  creatorId: string;
  likes: string[];
}

interface PostsCategory {
  currentCategoryId: string;
  userConnected: User;
}

const PostsCategory: React.FC<PostsCategory> = (props: PostsCategory) => {
  const { currentCategoryId, userConnected } = props;
  const { loading, data } = useQuery<PostsResponse>(GET_POSTS_BY_CATEGORY_ID, {
    variables: { categoryId: currentCategoryId },
  });
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
