import React, { useState } from "react";
import Router from "next/router";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import validationForm from "@helpers/validation";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    top: "6rem",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Form = (props: any) => {
  const [error, setError] = useState("");
  const { user, userFormType, createUser, updateUser } = props;
  const isCreate = userFormType === "inscription";
  const classes = useStyles();

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  };

  const onSubmit = async (values) => {
    if (isCreate) {
      const data = await createUser({
        variables: {
          userInput: {
            ...values,
          },
        },
      });
      if (data.data.createUser.error) {
        setError(data.data.createUser.error);
      } else {
        Router.push("/");
      }
    } else {
      updateUser();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {isCreate ? "INSCRIPTION" : "MODIFIER PROFIL"}
        </Typography>
        <Formik
          initialValues={initialValues}
          validate={(values): object => validationForm(values)}
          onSubmit={(values) => onSubmit(values)}
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
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                type="name"
                autoComplete="name"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                helperText={touched.name ? errors.name : ""}
                error={touched.name && Boolean(errors.name)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="email"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="password"
                name="password"
                type="password"
                autoComplete="password"
                autoFocus
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
              />
              <p>{error}</p>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submit}
              >
                {isCreate ? "INSCRIPTION" : "MODIFIER PROFIL"}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default Form;
