import * as React from "react";
import Grid from "@material-ui/core/Grid";

import Login from "@component/login";
import Categories from "@component/categories";
import NewPost from "@component/newPost";
import PostsContainer from "@component/postsContainer";
import TestSCSS from "@component/TestSCSS";
import UserContext from "@context/userContext";

const HomePage: React.FC<{}> = () => {
  const { isAuth } = React.useContext(UserContext);

  if (isAuth) {
    return (
      <div>
        <Grid container>
          <Grid
            style={{ textAlign: "center", marginTop: "18px" }}
            item
            xs={12}
            sm={3}
          >
            <Categories isDisplayCategories />
          </Grid>
          <Grid style={{ textAlign: "center" }} item xs={12} sm={9}>
            <NewPost />
            <PostsContainer />
          </Grid>
        </Grid>
      </div>
    );
  }
  return (
    <>
      <TestSCSS />
      <div style={{ textAlign: "center", paddingTop: "30px" }}>
        <Login />
      </div>
    </>
  );
};

export default HomePage;
