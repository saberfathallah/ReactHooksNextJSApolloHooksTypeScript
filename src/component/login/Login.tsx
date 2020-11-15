import React, { useState } from 'react';
import { useMutation } from '../../hooks/useMutation';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';

import buildCookies from '@services/cookies';
import LOGIN_MUTATION from '@graphql/users/mutations/loginMutation';
import { TOKEN_COOKIE, USER_NAME } from '@constants/cookies';


const useStyles = makeStyles(() => createStyles({
  msgError: {
    color: 'red',
  },
  button: {
    marginRight: '10px',
  },
}));


interface Values {
  email: string;
  name: string;
  password: string;
}

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

const Login: React.FC<{}> = () => {
  const classes = useStyles();
  const [login] = useMutation(LOGIN_MUTATION, { variables: false });
  const [error, setError] = useState('');
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={(values): object => {
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
      onSubmit={async (values): Promise<void> => {
        setError('');
        const { data }: any = await login({
          variables: {
            loginInput: {
              ...values,
            },
          },
        });
        if (data.login.error) {
          setError(data.login.error);
        } else {
          buildCookies().set(TOKEN_COOKIE, data.login.token, { path: '/' });
          buildCookies().set(USER_NAME, data.login.user.name, { path: '/' });
          // eslint-disable-next-line no-undef
          window.location.reload();
        }
      }}
    >
      {({ submitForm, isSubmitting }): any => (
        <Form>
          <Field
            component={TextField}
            name="email"
            type="email"
            label="Email"
            style={{ width: '225px' }}
          />
          <br />
          <Field
            component={TextField}
            type="password"
            label="Password"
            name="password"
            style={{ marginBottom: '20px', width: '225px' }}
          />
          {isSubmitting && <LinearProgress />}
          <br />
          <div>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
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
