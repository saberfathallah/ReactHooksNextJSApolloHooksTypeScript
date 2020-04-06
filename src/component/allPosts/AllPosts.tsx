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
  userId: string;
  name: string;
  id: string;
}

interface IComment {
  description: string;
  postId: string;
  id: string;
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

interface IAllPostsProps {
  userConnected: IUser
};

const AllPosts: React.FC<IAllPostsProps> = (props: IAllPostsProps) => {
  const { userConnected } = props;
  const { data, loading } = useQuery<IPostsResponse>(GET_ALL_POSTS);
  if (loading) return <p>loading...</p>

  return (
    <div>
      {
        data.getAllPosts.posts.map((
          { userId: { name, id: creatorId },
          description,
          comments,
          id,
          categoryId,
        }) => 
          <div key={id}>
            <Post
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
      }
    </div>
  );
}
  
export default AllPosts;
