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
  
interface IComment {
  description: string;
}
    
interface IPost {
  comments: IComment[];
  description: string;
  id: string;
}

const Profil: React.FC<{}> = () => {
  // TODO client side to server side
  const { data, loading } = useQuery<IPostsResponse>(GET_POSTS_BY_USER_ID);

  if (loading) return <p>loading...</p>

  return (
    <div>
      {
        data.getPostsByUserId.posts.length > 0 ? 
        data.getPostsByUserId.posts.map(({ description, comments, id }) => 
          <div key={id}>
            <Post
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
