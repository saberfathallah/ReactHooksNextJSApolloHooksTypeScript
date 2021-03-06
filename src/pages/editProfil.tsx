import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import GET_USER_DETAILS from "@graphql/users/queries/getUserDetails";
import From from "@component/form";
import UserContext from "@context/userContext";

const EditProfil = () => {
  const { isAuth } = useContext(UserContext);
  const { data, loading } = useQuery(GET_USER_DETAILS, {
    skip: !isAuth,
  });
  const upadateProfil = () => console.log("update profil");

  // serverSide
  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <From
          user={data?.getUserDetails?.user}
          userFormType="editProfil"
          upadateProfil={upadateProfil}
        />
      )}
    </div>
  );
};

export default EditProfil;
