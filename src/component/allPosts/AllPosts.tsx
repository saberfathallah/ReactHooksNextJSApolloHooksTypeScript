import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Post from '../post';
import GET_ALL_POSTS from '../../graphql/posts/getAllPosts';

interface IPostsResponse {
  getAllPosts: IPosts;
}
  
interface IPosts {
  posts: IPost[]
}

interface IUser {
  name: string;
}

interface IComment {
  description: string;
  postId: string;
  userId: IUser;
}
  
interface IPost {
  userId: IUser;
  categoryId: string;
  postId: string;
  comments: IComment[];
  description: string;
  id: string;
}

const AllPosts: React.FC<{}> = () => {
  const { data, loading } = useQuery<IPostsResponse>(GET_ALL_POSTS);
  if (loading) return <p>loading...</p>

  return (
    <div>
      {
        data.getAllPosts.posts.map((
          { userId: { name },
          description,
          comments,
          id,
          categoryId,
        }) => 
          <div key={id}>
            <Post
              postId={id}
              categoryId={categoryId}
              userName={name}
              description={description}
              comments={comments}
            />
          </div>
        )
      }
    </div>
  );
}
  
export default AllPosts;
