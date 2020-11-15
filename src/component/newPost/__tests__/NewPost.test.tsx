import React from "react";
import renderer from "react-test-renderer";

import NewPost from "../NewPost";

describe("NewPost", () => {
  it("should display posts snapshot", () => {
    const props = {
      categoryId: "",
      setCategoryId: () => '',
      addPost: () => {}

    }
    const tree = renderer.create(<NewPost {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
