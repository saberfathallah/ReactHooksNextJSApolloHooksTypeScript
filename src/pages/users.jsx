import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';

import USERS from '@graphql/users/queries/usersQuery';
import CREATE_USER, { updateCacheAfterCreateUser } from '@graphql/users/mutations/createUserMutation';
import DELETE_USER, { updateCacheAfterDeleteUser } from '@graphql/users/mutations/deleteUserMutation';

const Users = () => {
  const { data, loading } = useQuery(USERS);
  const [createUser, { data: responseUser }] = useMutation(CREATE_USER, { update: updateCacheAfterCreateUser });
  const [deleteUser] = useMutation(DELETE_USER, { update: updateCacheAfterDeleteUser });

  if (loading) return <p>loading...</p>
  return (
    <div>
      {data.users.users.map(user =>
        <div>
          <p key={user.email}>{user.name}</p>
          <button onClick={ () => deleteUser({ variables: { email: user.email }})}>delete user</button>
        </div>
      )}
      <div>
      <h1>users</h1>
      <Formik
        initialValues={{ email: '', password: '', name: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          } else if (!values.password) {
            errors.password = 'Required';
          } else if (!values.name) {
            errors.name = 'Required';
          } 
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await createUser({ variables: { userInput: {
            ...values
          }},
        })}}
      >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
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
}
  
export default Users