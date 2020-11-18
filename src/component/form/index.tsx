import React from "react";

import Form from "./Form";
import { useMutation } from "../../hooks/useMutation";
import CREATE_USER from "@graphql/users/mutations/createUserMutation";

const FormContainer = (props) => {
  const { user, userFormType } = props;
  const [createUser] = useMutation(CREATE_USER);

  return (
    <Form user={user} userFormType={userFormType} createUser={createUser} />
  );
};

export default FormContainer;
