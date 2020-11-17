import React from "react";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import { User } from "../../types/user";
import EditCommentIconButton from "./EditCommentIconButton";
import DeleteCommentIconButton from "./DeleteCommentIconButton";
interface VariablesUpdate {
  variables: {
    updateCommentInput: {
      commentId: string;
      description: string;
    };
  };
}

interface VariablesDelete {
  variables: {
    deleteCommentInput: {
      commentId: string;
      postId: string;
    };
  };
}

interface CommetProps {
  name: string;
  description: string;
  creatorId: string;
  userCommentedId: string;
  userConnected: User;
  postId: string;
  id: string;
  updateComment: (variables: VariablesUpdate) => any;
  deleteComment: (variables: VariablesDelete) => any;
  isClickEdit: boolean;
  isShown: boolean;
  setIsShown: (boolean) => void;
  setIsClickEdit: (boolean) => void;
}

// interface CommentType {
//   description: string;
//   userId: User;
//   postId: string;
//   id: string;
// }

// interface UpdatedCommetResponse {
//   updateComment: CommentType;
// }

// interface DeleteComment {
//   commentId: string;
//   postId: string;
// }

// interface DeletedCommetResponse {
//   deleteComment: DeleteComment;
// }

interface CommentEditFormInput {
  description: string;
  commentId: string;
}

// interface FormUpdate {
//   description: string;
//   commentId: string;
// }

// interface UpdateCommentInput {
//   updateCommentInput: FormUpdate;
// }

// interface DeleteCommentInput {
//   deleteCommentInput: DeleteComment;
// }

const Comment: React.FC<CommetProps> = (props: CommetProps) => {
  const {
    updateComment,
    deleteComment,
    name,
    description,
    userConnected,
    userCommentedId,
    creatorId,
    postId,
    id,
    isClickEdit,
    isShown,
    setIsShown,
    setIsClickEdit,
  } = props;
  const initialValues: CommentEditFormInput = { description, commentId: id };

  return (
    <>
      {isClickEdit ? (
        <Formik
          initialValues={initialValues}
          validate={(values): object => {
            let errors = {};
            if (!values.description) {
              errors = {
                ...errors,
                description: "Required",
              };
            }
            return errors;
          }}
          onSubmit={async (values): Promise<void> => {
            if (values.description !== description) {
              await updateComment({
                variables: {
                  updateCommentInput: {
                    ...values,
                    commentId: id,
                  },
                },
              });
            }
            setIsClickEdit(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }): any => (
            <form style={{ display: "contents" }} onSubmit={handleSubmit}>
              <TextField
                type="description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                id="standard-full-width"
                label="Ajouter un commentaire"
                style={{ margin: 8 }}
                placeholder=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {errors.description && touched.description && errors.description}
              <EditCommentIconButton setIsClickEdit={setIsClickEdit} />
            </form>
          )}
        </Formik>
      ) : (
        <div
          id="comment-actions"
          style={{ display: "contents" }}
          onMouseEnter={(): void => setIsShown(true)}
          onMouseLeave={(): void => setIsShown(false)}
        >
          <ListItemAvatar>
            <Avatar alt="Profile Picture" src="" />
          </ListItemAvatar>
          <ListItemText primary={name} secondary={description} />
          {isShown && (
            <div>
              <>
                {(userConnected.id === userCommentedId ||
                  userConnected.id === creatorId) && (
                  <DeleteCommentIconButton
                    deleteComment={deleteComment}
                    postId={postId}
                    commentId={id}
                  />
                )}
                {userConnected.id === userCommentedId && (
                  <EditCommentIconButton setIsClickEdit={setIsClickEdit} />
                )}
              </>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Comment;
