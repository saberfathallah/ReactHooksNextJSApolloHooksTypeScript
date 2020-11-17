import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import EditCommentIconButton from "../EditCommentIconButton";

describe("EditCommentIconButton", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(<EditCommentIconButton setIsClickEdit={() => {}} />);
    expect(tree).toMatchSnapshot();
  });

  it("shouldn't call addLike should call dislike", () => {
    const setIsClickEdit = jest.fn();
    const wrapper = mount(<EditCommentIconButton setIsClickEdit={setIsClickEdit} />);
    wrapper.find("button").simulate("click");
    expect(setIsClickEdit).toHaveBeenCalledTimes(1);
  });
});
