import React from "react";
import renderer from "react-test-renderer";
import Test from "../Test";

describe("Test", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(
      <Test  />
    );
    expect(tree).toMatchSnapshot();
  });
});
