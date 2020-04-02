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
  userId: IUser;
}
  
interface IPost {
  userId: IUser;
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
        data.getAllPosts.posts.map(({ userId: { name }, description, comments, id }) => 
          <div key={id}>
            <Post
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
