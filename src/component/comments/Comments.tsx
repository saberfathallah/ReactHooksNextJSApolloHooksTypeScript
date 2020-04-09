import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import ADD_COMMENT, { updateCacheAfterAddComment } from '../../graphql/comments/mutation/addComment';
import GET_CURRENT_CATEGORY_ID from '../../graphql/client/queries/getCurrentCategoryId';
import Comment from '../comment';

const useStyles = makeStyles((theme: Theme) => createStyles({
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
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  button: {
    margin: theme.spacing(1),
    float: 'right',
  },
}));

interface User {
  name: string;
  id: string;
}

interface Comment {
  description: string;
  userId: User;
  postId: string;
  id: string;
}
interface CommentProps {
  comments: Comment[];
  postId: string;
  categoryId: string;
  userConnected: User;
  creatorId: string;
}

interface CommnetFormInput {
  description: string;
  postId: string;
  categoryId: string;
}

const Comments: React.FC<CommentProps> = (props: CommentProps) => {
  const {
    comments, categoryId, postId, userConnected, creatorId,
  } = props;
  const { data: { currentCategoryId } } = useQuery(GET_CURRENT_CATEGORY_ID);
  const [addComment] = useMutation<any>(ADD_COMMENT,
    { update: (cache, { data }) => updateCacheAfterAddComment(cache, data, currentCategoryId) });
  const classes = useStyles();
  const initialValues: CommnetFormInput = { description: '', postId: '', categoryId: '' };

  return (
    <>
      <List className={classes.list}>
        {comments.map(({
          userId: { name, id: userCommentedId }, description, postId: postIdent, id,
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
        ))}
      </List>
      <Formik
        initialValues={initialValues}
        validate={(values): object => {
          let errors = {};
          if (!values.description) {
            errors = {
              ...errors,
              email: 'Required',
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
