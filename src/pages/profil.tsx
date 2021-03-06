import React from "react";
import Link from "next/link";

import withApollo from "@lib/withApollo";
import Post from "@component/post";
import GET_POSTS_BY_USER_ID from "@graphql/posts/getPostsByUserId";

interface PostsResponse {
  getPostsByUserId: Posts;
  error: string;
}

interface Posts {
  posts: Post[];
}

interface User {
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
  likes: string[];
}

const Profil = (props: PostsResponse): JSX.Element => {
  const { getPostsByUserId } = props;

  return (
    <div>
      <Link href="/editProfil">
        <a>modifier profil</a>
      </Link>
      {getPostsByUserId.posts.length > 0 ? (
        getPostsByUserId.posts.map(
          ({ userId, description, comments, id, categoryId, likes }) => (
            <div key={id}>
              <Post
                likes={likes}
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
        )
      ) : (
        <p>acune publication</p>
      )}
    </div>
  );
};

Profil.getInitialProps = async function ({ apolloClient }: any): Promise<any> {
  const {
    data: { getPostsByUserId },
  } = await apolloClient.query({
    query: GET_POSTS_BY_USER_ID,
  });

  return {
    getPostsByUserId,
  };
};
export default withApollo(Profil);
