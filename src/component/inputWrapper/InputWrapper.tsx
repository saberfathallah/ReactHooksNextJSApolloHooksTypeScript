import React from "react";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import EditCommentIconButton from "@component/comment/EditCommentIconButton";
import Input from "@component/input";
import validationForm from "@helpers/validation";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      float: "right",
    },
  })
);
interface CommentEditFormInput {
  description: string;
}
interface InputWrapperProps  {
  label: string;
  setIsClickEdit: (boolean) => void;
  updateComment: (variables: any) => any;
  addComment: (variables: any) => any;
  variables: {
    description: string;

  }
}

const InputWrapper = (props: InputWrapperProps) => {
  const { label, addComment, variables, updateComment, setIsClickEdit } = props;
  const initialValues: CommentEditFormInput = variables;
  const classes = useStyles();
  const style = { margin: 8 };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values): object => validationForm(values)}
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
          <Input
            handleChange={handleChange}
            onBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
            label={label}
            variables={variables}
            style={style}
          />
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
