import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Post from '../component/post';
import GET_POSTS_BY_USER_ID from '../graphql/posts/getPostsByUserId';

interface IPostsResponse {
  getPostsByUserId: IPosts;
  error: string;
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

const Profil: React.FC<{}> = () => {
  // TODO client side to server side
  const { data, loading } = useQuery<IPostsResponse>(GET_POSTS_BY_USER_ID);

  if (loading) return <p>loading...</p>
  console.log("data.getPostsByUserId.posts", data.getPostsByUserId.posts);
  return (
    <div>
      {
        data.getPostsByUserId.posts.length > 0 ? 
        data.getPostsByUserId.posts.map(({
          userId,
          description,
          comments,
          id,
          categoryId,
        }) => 
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
        )
        :
        <p>acune publication</p>
      }
    </div>
  );
}
  
export default Profil;
