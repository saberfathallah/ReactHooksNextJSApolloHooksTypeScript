import React from "react";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import EditCommentIconButton from "@component/comment/EditCommentIconButton";

interface CommentEditFormInput {
  description: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      float: "right",
    },
  })
);

const InputWrapper = (props) => {
  const { label, addComment, variables, updateComment, setIsClickEdit } = props;
  const initialValues: CommentEditFormInput = variables;
  const classes = useStyles();

  return (
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
        if (label === "Ajouter un commentaire") {
          await addComment({
            variables: {
              commentInput: {
                ...variables,
                ...values,
              },
            },
          });
        } else {
          if (values.description !== variables.description) {
            await updateComment({
              variables: {
                updateCommentInput: {
                  ...variables,
                  ...values,
                },
              },
            });
          }
          setIsClickEdit(false);
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
        <form style={{ display: "contents" }} onSubmit={handleSubmit}>
          <TextField
            type="description"
            name="description"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            id={`${variables.description}standard-full-width`}
            label={label}
            style={{ margin: 8 }}
            placeholder=""
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {errors.description && touched.description && errors.description}
          {label === "Ajouter un commentaire" ? (
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
          ) : (
            <EditCommentIconButton setIsClickEdit={setIsClickEdit} />
          )}
        </form>
      )}
    </Formik>
  );
};

export default InputWrapper;
