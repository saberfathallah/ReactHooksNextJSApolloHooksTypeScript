import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import Navbar from "../Navbar";

const renderer = new ShallowRenderer();

describe("<Navbar />", () => {
  it("should match snapshot", () => {
    const props = {
      changeCurrentCategory: () => "",
      changeSearchQuery: () => "",
      userName: "saber",
    };
    const tree = renderer.render(
        <Navbar {...props} />
    );
    expect(tree).toMatchSnapshot();
  });
});
