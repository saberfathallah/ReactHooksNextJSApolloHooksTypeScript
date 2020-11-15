import React from "react";
import { useMutation } from "../../hooks/useMutation";

import DELETE_COMMENT, {
  updateCacheAfterDeleteComment,
} from "@graphql/comments/mutation/deleteComment";
import UPDATE_COMMENT, {
  updateCacheAfterUpdateComment,
} from "@graphql/comments/mutation/updateComment";
import Comment from "./Comment";
import { User } from "../../types/user";

interface CommetContainerProps {
  name: string;
  description: string;
  creatorId: string;
  userCommentedId: string;
  userConnected: User;
  postId: string;
  id: string;
  currentCategoryId: string;
}

const CommentContainer = (props: CommetContainerProps) => {
  const {
    name,
    description,
    userConnected,
    userCommentedId,
    creatorId,
    postId,
    id,
    currentCategoryId,
  } = props;

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    optionCache: {
      variables: currentCategoryId,
      updateCacheFunction: updateCacheAfterDeleteComment,
    },
  });

  const [updateComment] = useMutation(UPDATE_COMMENT, {
    optionCache: {
      variables: currentCategoryId,
      updateCacheFunction: updateCacheAfterUpdateComment,
    },
  });

  return (
    <Comment
      deleteComment={deleteComment}
      updateComment={updateComment}
      name={name}
      description={description}
      userConnected={userConnected}
      userCommentedId={userCommentedId}
      creatorId={creatorId}
      postId={postId}
      id={id}
    />
  );
};

export default CommentContainer;
