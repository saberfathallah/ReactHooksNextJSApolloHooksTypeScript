import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Post from '@component/post';
import GET_POSTS_BY_USER_ID from '@graphql/posts/getPostsByUserId';

interface PostsResponse {
  getPostsByUserId: Posts;
  error: string;
}

interface Posts {
  posts: Post[];
}


interface User {
  userId: string;
  name: string;
  id: string;
}

interface Comment {
  description: string;
  postId: string;
  id: string;
  userId: User;
}

interface Post {
  userId: User;
  categoryId: string;
  postId: string;
  comments: Comment[];
  description: string;
  id: string;
}

const Profil: React.FC<{}> = () => {
  // TODO client side to server side
  const { data, loading } = useQuery<PostsResponse>(GET_POSTS_BY_USER_ID);

  if (loading) return <p>loading...</p>;

  return (
    <div>
      {
        data.getPostsByUserId.posts.length > 0
          ? data.getPostsByUserId.posts.map(({
            userId,
            description,
            comments,
            id,
            categoryId,
          }) => (
            <div key={id}>
              <Post
                creatorId={userId.id}
                userConnected={userId}
                postId={id}
                categoryId={categoryId}
                userName={userId.name}
                description={description}
                comments={comments}
              />
            </div>
          ))
          : <p>acune publication</p>
      }
    </div>
  );
};

export default Profil;
