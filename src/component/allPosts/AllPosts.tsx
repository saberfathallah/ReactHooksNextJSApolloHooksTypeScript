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

interface IComment {
  description: string;
}
  
interface IPost {
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
        data.getAllPosts.posts.map(({ description }) => 
          <Post
            description={description}
          />
        )
      }
    </div>
  );
}
  
export default AllPosts;
