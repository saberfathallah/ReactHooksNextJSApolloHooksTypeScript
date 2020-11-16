import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { Formik } from "formik";

import Comment from "../Comment";
import { useMutation } from "../../../hooks/useMutation";
import { USER_CONNECTED } from "../../../../mock/usersMock";

jest.mock("../../../hooks/useQuery", () => ({
  useQuery: jest.fn(),
}));

jest.mock("../../../hooks/useMutation", () => ({
  useMutation: jest.fn(),
}));

// @ts-ignore
useMutation.mockImplementation(() => [() => {}, { loading: false }]);

describe("Comment", () => {
  const deleteComment = jest.fn();
  const updateComment = jest.fn();
  const setIsShown = jest.fn();
  const setIsClickEdit = jest.fn();

  it("should match snapshot isShown===true && isClickEdit===true", () => {
    const props = {
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
      userConnected: USER_CONNECTED,
    };

    const tree = renderer.create(<Comment {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot isShown===true && isClickEdit===false display edit and delete icons", () => {
    const props = {
      deleteComment,
      setIsShown,
      updateComment,
      setIsClickEdit,
      isShown: true,
      isClickEdit: false,
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

    const tree = renderer.create(<Comment {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot isShown===true && isClickEdit===false display delete icon", () => {
    const props = {
      deleteComment,
      setIsShown,
      updateComment,
      setIsClickEdit,
      isShown: true,
      isClickEdit: false,
      categoryId: "5e89c6458245cd0d75dec50f",
      name: "commment",
      description: "description",
      creatorId: "5e89c2fd8245cd0d75dec501",
      postId: "5e89c6878245cd0d75dec510",
      userCommentedId: "5e89c6878245cd0d75dec510",
      id: "5e89c6878245cd0d75dec510",
      userConnected: {
        id: "5e89c2fd8245cd0d75dec501",
        email: "sberrr@gmail.com",
        name: "sberrr",
      },
    };

    const tree = renderer.create(<Comment {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot isShown===false && isClickEdit===true", () => {
    const props = {
      deleteComment,
      setIsShown,
      updateComment,
      setIsClickEdit,
      isShown: false,
      isClickEdit: true,
      categoryId: "5e89c6458245cd0d75dec50f",
      name: "commment",
      description: "description",
      creatorId: "5e89c2fd8245cd0d75dec501",
      postId: "5e89c6878245cd0d75dec510",
      userCommentedId: "5e89c6878245cd0d75dec510",
      id: "5e89c6878245cd0d75dec510",
      userConnected: USER_CONNECTED,
    };

    const tree = renderer.create(<Comment {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot isShown===false && isClickEdit===false", () => {
    const props = {
      deleteComment,
      setIsShown,
      updateComment,
      setIsClickEdit,
      isShown: false,
      isClickEdit: false,
      categoryId: "5e89c6458245cd0d75dec50f",
      name: "commment",
      description: "description",
      creatorId: "5e89c2fd8245cd0d75dec501",
      postId: "5e89c6878245cd0d75dec510",
      userCommentedId: "5e89c6878245cd0d75dec510",
      id: "5e89c6878245cd0d75dec510",
      userConnected: USER_CONNECTED,
    };

    const tree = renderer.create(<Comment {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should update description field on change", () => {
    const props = {
      deleteComment,
      setIsShown,
      updateComment,
      setIsClickEdit,
      isShown: false,
      isClickEdit: true,
      categoryId: "5e89c6458245cd0d75dec50f",
      name: "commment",
      description: "description",
      creatorId: "5e89c2fd8245cd0d75dec501",
      postId: "5e89c6878245cd0d75dec510",
      userCommentedId: "5e89c6878245cd0d75dec510",
      id: "5e89c6878245cd0d75dec510",
      userConnected: USER_CONNECTED,
    };
    const wrapper = mount(<Comment {...props} />);
    const descriptionInput = wrapper.find("input");

    descriptionInput.simulate("change", {
      persist: () => {},
      target: {
        name: "description",
        value: "new comment",
      },
    });

    expect(descriptionInput.html()).toMatch("new comment");
  });

  it("should return error for invalid comment", () => {
    const props = {
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
      userConnected: USER_CONNECTED,
    };
    const tree = mount(<Comment {...props} />);

    const form = (props: any = { errors: {} }) =>
      tree.find(Comment).find(Formik).renderProp("children")(props);

    const formWithInvalidDescriptionErrors = form({
      values: {
        description: "",
      },
      errors: {
        description: "Required",
      },
      touched: { description: true },
      isSubmitting: false,
    });

    expect(formWithInvalidDescriptionErrors.html()).toMatch(/Required/);
  });

  it("should call setIsShown", () => {
    const props = {
      deleteComment,
      setIsShown,
      updateComment,
      setIsClickEdit,
      isShown: false,
      isClickEdit: false,
      categoryId: "5e89c6458245cd0d75dec50f",
      name: "commment",
      description: "description",
      creatorId: "5e89c2fd8245cd0d75dec501",
      postId: "5e89c6878245cd0d75dec510",
      userCommentedId: "5e89c6878245cd0d75dec510",
      id: "5e89c6878245cd0d75dec510",
      userConnected: USER_CONNECTED,
    };
    const wrapper = mount(<Comment {...props} />);

    wrapper.find("#comment-actions").simulate("mouseenter");
    expect(setIsShown).toHaveBeenCalledWith(true);
    wrapper.find("#comment-actions").simulate("mouseleave");
    expect(setIsShown).toHaveBeenCalledWith(false);
  });

  it("should call deleteComment", () => {
    const props = {
      deleteComment,
      setIsShown,
      updateComment,
      setIsClickEdit,
      isShown: true,
      isClickEdit: false,
      categoryId: "5e89c6458245cd0d75dec50f",
      name: "commment",
      description: "description",
      creatorId: "5e89c2fd8245cd0d75dec501",
      postId: "5e89c6878245cd0d75dec510",
      userCommentedId: "5e89c6878245cd0d75dec510",
      id: "5e89c6878245cd0d75dec510",
      userConnected: {
        id: "5e89c2fd8245cd0d75dec501",
        email: "sberrr@gmail.com",
        name: "sberrr",
      },
    };
    const wrapper = mount(<Comment {...props} />);
    
    wrapper.find("button").simulate("click");
    expect(deleteComment).toHaveBeenCalledTimes(1);
  });
  
  // it("should call setIsClickEdit with true", () => {
  //   const props = {
  //     deleteComment,
  //     setIsShown,
  //     updateComment,
  //     setIsClickEdit,
  //     isShown: true,
  //     isClickEdit: false,
  //     categoryId: "5e89c6458245cd0d75dec50f",
  //     name: "commment",
  //     description: "description",
  //     creatorId: "5e89c2fd8245cd0d75dec501",
  //     postId: "5e89c6878245cd0d75dec510",
  //     userCommentedId: "5e89c6878245cd0d75dec510",
  //     id: "5e89c6878245cd0d75dec510",
  //     userConnected: {
  //       id: "5e89c6878245cd0d75dec510",
  //       email: "sberrr@gmail.com",
  //       name: "sberrr",
  //     },
  //   };
  //   const wrapper = mount(<Comment {...props} />);
  //   wrapper.find("#IconButtondelete").simulate("click");

    
    // const button = wrapper.findWhere(
    //   (node) => node.type() === 'button' && node.find(DeleteIcon)
    // );
    // button.simulate("click");
    // expect(setIsClickEdit).toHaveBeenCalledTimes(1);
  // });
});
