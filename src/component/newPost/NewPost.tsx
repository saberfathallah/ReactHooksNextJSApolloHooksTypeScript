import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Categories from '../categories';
import ADD_POST from '../../graphql/posts/mutation/addPost';
import GET_ALL_POSTS from '../../graphql/posts/getAllPosts';
import GET_POSTS_BY_CATEGORY_ID from '../../graphql/posts/getPostsByCategoryId';
import { LIMIT, FROM } from '../../constants/posts';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },

}));

const NewPost = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState('');
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries:
    [
      { query: GET_ALL_POSTS, variables: { from: FROM, limit: LIMIT } },
      { query: GET_POSTS_BY_CATEGORY_ID, variables: { categoryId } },
    ],
  });
  const initialValues = { description: '', categoryId };

  const handleClickOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Fab onClick={handleClickOpen} color="secondary" aria-label="edit">
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Nouvelle publication</DialogTitle>
        <Formik
          initialValues={initialValues}
          validate={(values): object => {
            let errors = {};
            if (!values.description) {
              errors = {
                ...errors,
                description: 'Required',
              };
            }
            return errors;
          }}
          onSubmit={async (values): Promise<void> => {
            if (categoryId) {
              await addPost({
                variables: {
                  postInput: {
                    ...values,
                    categoryId,
                  },
                },
              });
              handleClose();
            }
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
            <>
              <DialogContent>
                <Categories selectCategoryId={setCategoryId} />
                {!categoryId && <p>Il faut séléctionner une catégorie</p>}
                <TextField
                  type="description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  id="standard-full-width"
                  label="Ajouter un commentaire"
                  style={{ width: '500px' }}
                  placeholder=""
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {errors.description && touched.description && errors.description}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Annuler
                </Button>
                <Button onClick={(): void => handleSubmit()} color="primary">
                  Ajouter
                </Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default NewPost;
