import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Comment from "../comment";
import { CommentType } from "../../types/comment";
import { User } from "../../types/user";
import InputWrapper from "@component/inputWrapper";

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

  const variables = {description: "", postId, categoryId };

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
            <React.Fragment key={id}>
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
      <InputWrapper
        label="Ajouter un commentaire"
        addComment={addComment}
        variables={variables}
      />
    </>
  );
};

export default Comments;
