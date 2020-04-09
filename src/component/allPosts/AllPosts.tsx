import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import Post from '../post';
import GET_ALL_POSTS from '../../graphql/posts/getAllPosts';
import PaginationControlled from '../pagination';
import { LIMIT, FROM } from '../../constants/posts';

interface PostsResponse {
  getAllPosts: Posts;
}

interface Posts {
  posts: Post[];
  totalPosts: number;
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

interface AllPostsProps {
  userConnected: User;
}

const AllPosts: React.FC<AllPostsProps> = (props: AllPostsProps) => {
  const [page, setPage] = React.useState(1);
  const { data, loading, fetchMore } = useQuery<PostsResponse>(GET_ALL_POSTS,
    {
      variables: { from: FROM, limit: LIMIT },
    });
  const { userConnected } = props;

  const fetchMorePost = (event, value): void => {
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
              __typename: 'Posts',
            },
          };
        },
      });
      setPage(value);
    }
  };
  if (loading) return <p>loading...</p>;
  const { getAllPosts: { totalPosts, posts } } = data;

  return (
    <div>
      {
        posts.map((
          {
            userId: { name, id: creatorId },
            description,
            comments,
            id,
            categoryId,
          },
        ) => (
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
        ))
      }
      <PaginationControlled
        fetchMorePost={fetchMorePost}
        page={page}
        totalPosts={totalPosts}
      />
    </div>
  );
};

export default AllPosts;
