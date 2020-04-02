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
}

interface IUser {
  name: string;
}
  
interface IPost {
  userId: IUser;
  categoryId: string;
  postId: string;
  comments: IComment[];
  description: string;
  id: string;
}

interface IPostsCategory {
  currentCategoryId: string;
}

const PostsCategory: React.FC<IPostsCategory> = (props: IPostsCategory) => { 
  const { currentCategoryId } = props;
  const { loading, data } = useQuery<IPostsResponse>(GET_POSTS_BY_CATEGORY_ID, {
    variables: { categoryId: currentCategoryId },
  });
  if (loading) return <p>loading...</p>

  return (
    <div>
      {
        data.getPostsByCategoryId.posts.map((
          { userId: { name },
          description,
          comments,
          id,
          categoryId,
          }) => 
          <div key={id}>
            <Post
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
