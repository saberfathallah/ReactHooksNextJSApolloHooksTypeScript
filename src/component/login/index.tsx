import React, { useState } from "react";

import { useMutation } from "../../hooks/useMutation";
import Login from "./Login";
import LOGIN_MUTATION from "@graphql/users/mutations/loginMutation";
import buildCookies from "@services/cookies";
import { TOKEN_COOKIE, USER_NAME } from "@constants/cookies";

const LoginContainer = () => {
  const [login] = useMutation(LOGIN_MUTATION);
  const [error, setError] = useState("");

  const onClickLogin = async (values) => {
    setError("");
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
      buildCookies().set(TOKEN_COOKIE, data.login.token, { path: "/" });
      buildCookies().set(USER_NAME, data.login.user.name, { path: "/" });
      // eslint-disable-next-line no-undef
      window.location.reload();
    }
  }
  return <Login error={error} login={onClickLogin} />;
};

export default LoginContainer;
