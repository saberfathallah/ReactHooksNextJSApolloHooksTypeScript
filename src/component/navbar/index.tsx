import React, { useContext } from "react";

import Navbar from "./Navbar";
import { useMutation } from "../../hooks/useMutation";
import UserContext from "@context/userContext";
import CHANGE_SEARCH_QUERY from "@graphql/client/mutation/changeSearchQuery";
import CHANGE_CURRENT_CATEGORY from "@graphql/client/mutation/changeCurrentCategory";

const NavbarContainer = () => {
  const { userName } = useContext(UserContext);
  const [changeSearchQuery] = useMutation(CHANGE_SEARCH_QUERY);
  const [changeCurrentCategory] = useMutation(CHANGE_CURRENT_CATEGORY);

  return (
    <Navbar
      userName={userName}
      changeSearchQuery={changeSearchQuery}
      changeCurrentCategory={changeCurrentCategory}
    />
  );
};

export default NavbarContainer;
