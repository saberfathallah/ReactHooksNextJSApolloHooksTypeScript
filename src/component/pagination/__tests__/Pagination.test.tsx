import React from "react";
import renderer from "react-test-renderer";
import Pagination from "../Pagination";
import { shallow } from "enzyme";

describe("BrandName", () => {
  it("should match snapshot when totalPosts % LIMIT === 0", () => {
    const tree = renderer.create(
      <Pagination fetchMorePost={() => {}} page={1} totalPosts={10} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot when totalPosts % LIMIT > 0", () => {
    const tree = renderer.create(
      <Pagination fetchMorePost={() => {}} page={1} totalPosts={11} />
    );
    expect(tree).toMatchSnapshot();
  });
});
