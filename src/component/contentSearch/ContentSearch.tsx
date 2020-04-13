import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import SEARCH from '@graphql/posts/search';

import Post from '../post';

interface PostsResponse {
  search: PostsType;
}

interface PostsType {
  posts: PostType[];
}

interface Comment {
  description: string;
  userId: User;
  postId: string;
  id: string;
}

interface User {
  name: string;
  id: string;
}

interface PostType {
  userId: User;
  categoryId: string;
  postId: string;
  comments: Comment[];
  description: string;
  id: string;
  creatorId: string;
}

interface SearchQueryType {
  query: string;
}

interface ContentSearchProps {
  dataSearchQuery: SearchQueryType;
  userConnected: User;
}

const ContentSearch: React.FC<ContentSearchProps> = (props: ContentSearchProps) => {
  const { dataSearchQuery, userConnected } = props;


  const { loading, data } = useQuery<PostsResponse>(SEARCH, {
    variables: { query: dataSearchQuery.query },
  });

  if (loading) return <p>loading...</p>;
  return (
    <div>
      {
        data.search.posts.map((
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
              categoryId={categoryId}
              postId={id}
              userName={name}
              description={description}
              comments={comments}
            />
          </div>
        ))
      }
    </div>
  );
};

export default ContentSearch;
