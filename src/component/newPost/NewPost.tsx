import React from "react";
import { Formik } from "formik";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Categories from "../categories";
import Input from "@component/input";
import validationForm from "@helpers/validation";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

interface AddPostVariables {
  variables: {
    postInput: {
      categoryId: string;
      description: string;
    };
  };
}
interface NewPostProps {
  open: boolean;
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
  addPost: (variables: AddPostVariables) => any;
  handleClickOpen: () => void;
  handleClose: () => void;
}

const NewPost = (props: NewPostProps) => {
  const {
    categoryId,
    setCategoryId,
    addPost,
    handleClickOpen,
    handleClose,
    open,
  } = props;
  const classes = useStyles();
  const initialValues = { description: "", categoryId };
  const style = { width: "500px"};

  return (
    <div className={classes.root}>
      <Fab onClick={handleClickOpen} color="secondary" aria-label="edit">
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Nouvelle publication</DialogTitle>
        <Formik
          initialValues={initialValues}
          validate={(values): object => validationForm(values)}
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
            <div>
              <DialogContent>
                <Categories selectCategoryId={setCategoryId} />
                {!categoryId && <p>Il faut séléctionner une catégorie</p>}
                <Input
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                  errors={errors}
                  touched={touched}
                  label="Ajouter une publication"
                  variables={values}
                  style={style}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Annuler
                </Button>
                <Button onClick={(): void => handleSubmit()} color="primary">
                  Ajouter
                </Button>
              </DialogActions>
            </div>
          )}
        </Formik>
      </Dialog>
    </div>
  );
};

export default NewPost;
