import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Post from '../post';
import GET_ALL_POSTS from '../../graphql/posts/getAllPosts';
import PaginationControlled from '../../component/pagination';
import { LIMIT, FROM } from '../../constants/posts';

interface IPostsResponse {
  getAllPosts: IPosts;
}
  
interface IPosts {
  posts: IPost[]
  totalPosts: number
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
  const [page, setPage] = React.useState(1);
  const { data, loading, fetchMore } = useQuery<IPostsResponse>(GET_ALL_POSTS,
    {
      variables: { from: FROM, limit: LIMIT },
    });
  const { userConnected } = props;

  const fetchMorePost = (event, value) => { 
    if (value > page) {
      fetchMore({
        variables: {
          offset: data.getAllPosts.totalPosts,
          from: page * LIMIT,
          limit: (value - page) * LIMIT,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
            return {
            ...fetchMoreResult,
            getAllPosts: {
              posts: [...prev.getAllPosts.posts, ...fetchMoreResult.getAllPosts.posts],
              __typename: 'Posts'
            },
          }
        }
      })
      setPage(value);
    } 
    // else {
    //   const existingPostsByCurrentCategoryId = cache.readQuery({
    //     query: GET_POSTS_BY_CATEGORY_ID,
    //     variables: { categoryId: currentCategoryId },
    //   });
    //   const index = existingPostsByCurrentCategoryId.getPostsByCategoryId.posts.findIndex(post => post.id === data.addComment.comment.postId);
    //   existingPostsByCurrentCategoryId.getPostsByCategoryId.posts[index].comments.push(data.addComment.comment);
    //   cache.writeQuery({  
    //     query: GET_POSTS_BY_CATEGORY_ID,
    //     variables: { categoryId: currentCategoryId },
    //     data: { getPostsByCategoryId: { ...existingPostsByCurrentCategoryId.getPostsByCategoryId, __typename: 'getPostsByCategoryId' } }
    //   });
    // }
  }
  if (loading) return <p>loading...</p>
  const { getAllPosts: { totalPosts, posts } } = data;

  return (
    <div>
      {
        posts.map((
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
      <PaginationControlled
        fetchMorePost={fetchMorePost}
        page={page}
        totalPosts={totalPosts}
      />
    </div>
  );
}
  
export default AllPosts;
