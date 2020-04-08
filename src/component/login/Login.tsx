import * as React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

import LOGIN_MUTATION from '../../graphql/users/mutations/loginMutation';
import buildCookies from '../../services/cookies';
import { TOKEN_COOKIE, USER_NAME } from '../../constants/cookies';

interface Values {
  email: string;
  name: string;
  password: string;
}

interface IInputValues {
  email: string;
  password: string;
}

interface IUser {
  user: Values;
  token: string;
}

interface ILonginResponse {
  login: IUser;
}
  
interface InputMyFormValues {
  loginInput: IInputValues
}

const Login: React.FC<{}> = () => {
  const [login] = useMutation<ILonginResponse, InputMyFormValues>(LOGIN_MUTATION);

  return (
    <Formik
      initialValues={{
      email: '',
      password: '',
      }}
      validate={values => {
        const errors: Partial<Values> = {};
          if (!values.password) {
            errors.password = 'Required';
          } 
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
        return errors;
      }}
      onSubmit={async values => {
        const { data } = await login({ variables: { loginInput: {
              ...values
            }},
        });
        buildCookies().set(TOKEN_COOKIE, data.login.token, { path: "/" });
        buildCookies().set(USER_NAME, data.login.user.name, { path: "/" });
        window.location.reload()
      }}
    >
    {({ submitForm, isSubmitting }) => (
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
        {isSubmitting && <LinearProgress />}
        <br />
        <Button
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          onClick={submitForm}
        >
        Se connecter
        </Button>
      </Form>
    )}
  </Formik>
  );
}

export default Login;
