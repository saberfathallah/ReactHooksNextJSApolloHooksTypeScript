import React from "react";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

interface EditCommentIconButton {
  setIsClickEdit: (boolean) => void;
}

const EditCommentIconButton = (props: EditCommentIconButton) => (
  <IconButton
    type="submit"
    onClick={(): void => props.setIsClickEdit(true)}
    aria-label="modify"
  >
    <EditIcon />
  </IconButton>
);

export default EditCommentIconButton;
