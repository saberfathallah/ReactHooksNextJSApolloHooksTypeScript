import React from "react";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

interface VariablesDelete {
  variables: {
    deleteCommentInput: {
      commentId: string;
      postId: string;
    };
  };
}

interface EditCommentIconButton {
  deleteComment: (variables: VariablesDelete) => any;
  commentId: string;
  postId: string;
}

const EditCommentIconButton = ({
  deleteComment,
  postId,
  commentId,
}: EditCommentIconButton) => (
  <IconButton
    aria-label="delete"
    onClick={(): Promise<object> =>
      deleteComment({
        variables: {
          deleteCommentInput: { postId, commentId },
        },
      })
    }
  >
    <DeleteIcon fontSize="small" />
  </IconButton>
);

export default EditCommentIconButton;
