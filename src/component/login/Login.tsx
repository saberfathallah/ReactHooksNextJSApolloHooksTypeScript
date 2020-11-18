import React from "react";
import { Formik, Form, Field } from "formik";
import { Button } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import validationForm from "@helpers/validation";

const useStyles = makeStyles(() =>
  createStyles({
    msgError: {
      color: "red",
    },
    button: {
      marginRight: "10px",
    },
  })
);

// interface Values {
//   email: string;
//   name: string;
//   password: string;
// }

// interface InputValues {
//   email: string;
//   password: string;
// }

// interface User {
//   user: Values;
//   token: string;
// }

// interface LonginResponse {
//   login: User;
// }

// interface MyFormValues {
//   loginInput: InputValues;
// }

interface LoginVariable {
  variables: {
    loginInput: {
      email: string;
      password: string;
    };
  };
}
interface LoginProps {
  login: (LoginVariable) => any;
  error: string;
}

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const { login, error } = props;
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={(values): object => validationForm(values)}
      onSubmit={async (values): Promise<void> => login(values)}
    >
      {() => (
        <Form>
          <Field
            component={TextField}
            name="email"
            type="email"
            label="Email"
            style={{ width: "225px" }}
          />
          <br />
          <Field
            component={TextField}
            type="password"
            label="Password"
            name="password"
            style={{ marginBottom: "20px", width: "225px" }}
          />
          <br />
          <div>
            <Button
              type="submit"
              className={classes.button}
              variant="contained"
              color="primary"
            >
              Se connecter
            </Button>
            <Link href="/inscription">
              <a>Inscription</a>
            </Link>
          </div>
          {error && <p className={classes.msgError}>{error}</p>}
        </Form>
      )}
    </Formik>
  );
};

export default Login;
