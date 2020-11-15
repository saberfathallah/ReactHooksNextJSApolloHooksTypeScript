import React from "react";
import renderer from "react-test-renderer";

import Like from "../Like";

describe("Like", () => {
  it("should display dislike snapshot", () => {
    const props = {
      dislike: () => {},
      addLike: () => {},
      nombreOffLikes: 1,
      isLiked: true,
      postId: "5e89c6878245cd0d75dec510",
    };

    const tree = renderer.create(<Like {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display like snapshot", () => {
    const props = {
      dislike: () => {},
      addLike: () => {},
      nombreOffLikes: 1,
      isLiked: false,
      postId: "5e89c6878245cd0d75dec510",
    };

    const tree = renderer.create(<Like {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
