import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import GET_USER_DETAILS from "@graphql/users/queries/getUserDetails";
import From from "@component/form";
import UserContext from "@context/userContext";

const Inscription = () => {
  const { isAuth } = useContext(UserContext);
  const { data, loading } = useQuery(GET_USER_DETAILS, {
    skip: !isAuth,
  });

  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <From user={data?.getUserDetails?.user} userFormType="inscription" />
      )}
    </div>
  );
};

export default Inscription;
