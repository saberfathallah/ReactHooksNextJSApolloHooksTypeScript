import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Comment from "../Comment";

describe("Comment", () => {
  const deleteComment = jest.fn();
  const updateComment = jest.fn();
  const setIsShown = jest.fn();
  const setIsClickEdit = jest.fn();

  let props = {
    deleteComment,
    setIsShown,
    updateComment,
    setIsClickEdit,
    isShown: true,
    isClickEdit: true,
    categoryId: "5e89c6458245cd0d75dec50f",
    name: "commment",
    description: "description",
    creatorId: "5e89c2fd8245cd0d75dec501",
    postId: "5e89c6878245cd0d75dec510",
    userCommentedId: "5e89c6878245cd0d75dec510",
    id: "5e89c6878245cd0d75dec510",
    userConnected: {
      id: "5e89c6878245cd0d75dec510",
      email: "sberrr@gmail.com",
      name: "sberrr",
    },
  };

  it("should match snapshot isShown===true && isClickEdit===true", () => {
    const tree = renderer.create(<Comment {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot isShown===true && isClickEdit===false display edit and delete icons", () => {
    props.isClickEdit = false;

    const tree = renderer.create(<Comment {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot isShown===true && isClickEdit===false display delete icon", () => {
    props.isClickEdit = false;
    props.userConnected.id = "5e89c2fd8245cd0d75dec501";

    const tree = renderer.create(<Comment {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot isShown===false && isClickEdit===true", () => {
    props.isClickEdit = true;
    props.isShown = false;

    const tree = renderer.create(<Comment {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot isShown===false && isClickEdit===false", () => {
    props.isClickEdit = false;
    props.isShown = false;

    const tree = renderer.create(<Comment {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should call setIsShown", () => {
    props.isClickEdit = false;
    props.isShown = false;

    const wrapper = mount(<Comment {...props} />);
    wrapper.find("#comment-actions").simulate("mouseenter");
    expect(setIsShown).toHaveBeenCalledWith(true);
    wrapper.find("#comment-actions").simulate("mouseleave");
    expect(setIsShown).toHaveBeenCalledWith(false);
  });

  it("should call deleteComment", () => {
    props.isShown = true;

    const wrapper = mount(<Comment {...props} />);
    wrapper.find("button").simulate("click");
    expect(deleteComment).toHaveBeenCalledTimes(1);
  });
});
