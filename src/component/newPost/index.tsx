import React from "react";

import { useMutation } from "../../hooks/useMutation";
import ADD_POST from "@graphql/posts/mutation/addPost";
import GET_ALL_POSTS from "@graphql/posts/getAllPosts";
import GET_POSTS_BY_CATEGORY_ID from "@graphql/posts/getPostsByCategoryId";
import { LIMIT, FROM } from "@constants/posts";
import NewPost from "./NewPost";

const NewPostContainer = () => {
  const [categoryId, setCategoryId] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [
      { query: GET_ALL_POSTS, variables: { from: FROM, limit: LIMIT } },
      { query: GET_POSTS_BY_CATEGORY_ID, variables: { categoryId } },
    ],
  });

  return (
    <NewPost
      open={open}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
      addPost={addPost}
      categoryId={categoryId}
      setCategoryId={setCategoryId}
    />
  );
};

export default NewPostContainer;
