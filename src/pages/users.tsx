import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';

import USERS from '../graphql/users/queries/usersQuery';
import CREATE_USER, { updateCacheAfterCreateUser } from '../graphql/users/mutations/createUserMutation';
import DELETE_USER, { updateCacheAfterDeleteUser } from '../graphql/users/mutations/deleteUserMutation';

interface MyFormValues {
  email: string;
  password: string;
  name: string;
}

interface InputMyFormValues {
  userInput: MyFormValues;
}

interface Item {
  email: string;
  name: string;
}

interface Users {
  users: {
    [key: string]: Item[];
  };
}

interface DeleteUserVars {
  email: string;
}

interface DeleteUserResponse {
  deleteUser: Item;
}

interface CreateUserResponse {
  createUser: Item;
}

const Users: React.FC<{}> = () => {
  const { data, loading } = useQuery<Users>(USERS);
  const [createUser] = useMutation<CreateUserResponse, InputMyFormValues>(
    CREATE_USER, { update: updateCacheAfterCreateUser },
  );
  const [deleteUser] = useMutation<DeleteUserResponse, DeleteUserVars>(
    DELETE_USER, { update: updateCacheAfterDeleteUser },
  );

  if (loading) return <p>loading...</p>;
  const initialValues: MyFormValues = { email: '', password: '', name: '' };

  return (
    <div>
      {data.users.users.map((user) => (
        <div key={user.email}>
          <p>{user.name}</p>
          <button
            type="button"
            onClick={(): any => deleteUser({ variables: { email: user.email } })}
          >
            delete user
          </button>
        </div>
      ))}
      <div>
        <h1>users</h1>
        <Formik
          initialValues={initialValues}
          validate={(values): object => {
            let errors = {};
            if (!values.email) {
              errors = {
                ...errors,
                email: 'Required',
              };
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors = {
                ...errors,
                email: 'Invalid email address',
              };
            } else if (!values.password) {
              errors = {
                ...errors,
                password: 'Required',
              };
            } else if (!values.name) {
              errors = {
                ...errors,
                name: 'Required',
              };
            }
            return errors;
          }}
          onSubmit={async (values): Promise<void> => {
            await createUser({
              variables: {
                userInput: {
                  ...values,
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
            isSubmitting,
          }): any => (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && errors.name}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Users;
