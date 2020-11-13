import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { MockedProvider } from "@apollo/client/testing";

import Post from "../Post";

const renderer = new ShallowRenderer();

describe("<Post />", () => {
  it("should match snapshot", () => {

    const props = {
      categoryId: "5e89c6458245cd0d75dec50f",
      comments: [],
      creatorId: "5e89c2fd8245cd0d75dec501",
      description: "corona france post",
      likes: ["5e8a26784c6b1d234b4c1a3f", "5e89c2fd8245cd0d75dec501"],
      postId: "5e89c6878245cd0d75dec510",
      userConnected: {
        id: "5fac3671dd9b1b079249d522",
        email: "sberrr@gmail.com",
        __typename: "User",
        name: "sberrr",
      },
      userName: "Saber Fathallah",
    };
    const tree = renderer.render(
      <MockedProvider mocks={[]}>
        <Post {...props} />
      </MockedProvider>
    );
    expect(tree).toMatchSnapshot();
  });

});
