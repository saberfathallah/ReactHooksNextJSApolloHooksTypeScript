import React from "react";

import ADD_COMMENT, {
  updateCacheAfterAddComment,
} from "@graphql/comments/mutation/addComment";
import GET_CURRENT_CATEGORY_ID from "@graphql/client/queries/getCurrentCategoryId";
import { useQuery } from "../../hooks/useQuery";
import { useMutation } from "../../hooks/useMutation";
import Comments from "./Comments";
import { CommentType } from "../../types/comment";
import { User } from "../../types/user";

interface CommentContainerProps {
  comments: CommentType[];
  postId: string;
  categoryId: string;
  userConnected: User;
  creatorId: string;
}

const CommentsContainer = (props: CommentContainerProps) => {
  const { comments, categoryId, postId, userConnected, creatorId } = props;

  const {
    data: { currentCategoryId },
  } = useQuery(GET_CURRENT_CATEGORY_ID, { variables: false });
  const [addComment] = useMutation(ADD_COMMENT, {
    optionCache: {
      variables: currentCategoryId,
      updateCacheFunction: updateCacheAfterAddComment,
    },
  });

  return (
    <Comments
      addComment={addComment}
      comments={comments}
      categoryId={categoryId}
      postId={postId}
      userConnected={userConnected}
      creatorId={creatorId}
      currentCategoryId={currentCategoryId}
    />
  );
};

export default CommentsContainer;
