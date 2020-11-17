import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Pagination from "../Pagination";

describe("BrandName", () => {
  const fetchMorePost = jest.fn();

  it("should match snapshot when totalPosts % LIMIT === 0", () => {
    const tree = renderer.create(
      <Pagination fetchMorePost={fetchMorePost} page={1} totalPosts={10} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot when totalPosts % LIMIT > 0", () => {
    const tree = renderer.create(
      <Pagination fetchMorePost={fetchMorePost} page={1} totalPosts={11} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("should display 3 paginations", () => {
    const tree = mount(
      <Pagination fetchMorePost={fetchMorePost} page={1} totalPosts={11} />
    );
    expect(tree.text()).toContain("1");
    expect(tree.text()).toContain("2");
    expect(tree.text()).toContain("3");
  });
});
