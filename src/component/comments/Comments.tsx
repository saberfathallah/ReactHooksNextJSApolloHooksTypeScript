import React from "react";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import Comment from "../comment";
import { CommentType } from '../../types/comment';
import { User } from '../../types/user';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: "auto",
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: "absolute",
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: "0 auto",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
    button: {
      margin: theme.spacing(1),
      float: "right",
    },
  })
);

interface AddCommentVariables {
  variables: {
    commentInput: {
      description: string;
      categoryId: string;
      postId: string;
    };
  };
}
interface CommentProps {
  comments: CommentType[];
  postId: string;
  categoryId: string;
  userConnected: User;
  creatorId: string;
  currentCategoryId: string;
  addComment: (variables: AddCommentVariables) => any;
}

interface CommnetFormInput {
  description: string;
  postId: string;
  categoryId: string;
}

const Comments: React.FC<CommentProps> = (props: CommentProps) => {
  const {
    comments,
    categoryId,
    postId,
    userConnected,
    creatorId,
    currentCategoryId,
    addComment,
  } = props;
  const classes = useStyles();
  const initialValues: CommnetFormInput = {
    description: "",
    postId: "",
    categoryId: "",
  };

  return (
    <>
      <List className={classes.list}>
        {comments.map(
          ({
            userId: { name, id: userCommentedId },
            description,
            postId: postIdent,
            id,
          }) => (
            <React.Fragment key={description}>
              <ListItem button>
                <Comment
                  currentCategoryId={currentCategoryId}
                  id={id}
                  postId={postIdent}
                  creatorId={creatorId}
                  userConnected={userConnected}
                  name={name}
                  description={description}
                  userCommentedId={userCommentedId}
                />
              </ListItem>
            </React.Fragment>
          )
        )}
      </List>
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
          await addComment({
            variables: {
              commentInput: {
                ...values,
                categoryId,
                postId,
              },
            },
          });
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
          <form onSubmit={handleSubmit}>
            <TextField
              type="description"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              id={`${postId}standard-full-width`}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              endIcon={<Icon>send</Icon>}
            >
              Commenter
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Comments;
