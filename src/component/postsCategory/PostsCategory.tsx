import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Post from '../post';
import GET_POSTS_BY_CATEGORY_ID from '../../graphql/posts/getPostsByCategoryId';

interface IPostsResponse {
  getPostsByCategoryId: IPosts;
}
  
interface IPosts {
  posts: IPost[]
}

interface IComment {
  description: string;
  userId: IUser;
  postId: string;
  id: string;
}

interface IUser {
  name: string;
  id: string;
}
  
interface IPost {
  userId: IUser;
  categoryId: string;
  postId: string;
  comments: IComment[];
  description: string;
  id: string;
  creatorId: string;
}

interface IPostsCategory {
  currentCategoryId: string;
  userConnected: IUser
}

const PostsCategory: React.FC<IPostsCategory> = (props: IPostsCategory) => { 
  const { currentCategoryId, userConnected } = props;
  const { loading, data } = useQuery<IPostsResponse>(GET_POSTS_BY_CATEGORY_ID, {
    variables: { categoryId: currentCategoryId },
  });
  if (loading) return <p>loading...</p>

  return (
    <div>
      {
        data.getPostsByCategoryId.posts.map((
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
              categoryId={categoryId}
              postId={id}
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
  
export default PostsCategory;
