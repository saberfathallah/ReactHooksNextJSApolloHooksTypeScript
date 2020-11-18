import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { Formik } from "formik";

import InputWrapper from "../InputWrapper";

describe("InputWrapper", () => {
  const setIsClickEdit = jest.fn();
  const updateComment = jest.fn();
  const addComment = jest.fn();

  const props = {
    label: "Ajouter un commentaire",
    setIsClickEdit,
    updateComment,
    addComment,
    variables: {
      description: "description",
    },
  };

  it("should display snapshot", () => {
    const tree = renderer.create(<InputWrapper {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display add comment button", () => {
    const wrapper = mount(<InputWrapper {...props} />);
    expect(wrapper.text()).toContain("Commenter");
  });

  it("should display modify comment icon", () => {
    props.label = "Modifier ton commentaire"

    const wrapper = mount(<InputWrapper {...props} />);

    expect(wrapper.text()).toContain("Modifier ton commentaire");
  });

  it("should update description field on change", () => {
    const wrapper = mount(<InputWrapper {...props} />);
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
    const tree = mount(<InputWrapper {...props} />);
    const form = (props: any = { errors: {} }) =>
      tree.find(InputWrapper).find(Formik).renderProp("children")(props);
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

  // it("shouldn't call dislike should call addLike", () => {
  // const addComment = jest.fn();
  //   props.addComment = addComment;

  //   const wrapper = mount(<InputWrapper {...props} />);

  //   //wrapper.find('[type="submit"]').simmulte('click')
  // .find(`input[name="${name}"]`)

  //   wrapper.find('MuiInputBase-root').simmulte('click')
  //   expect(addComment).toHaveBeenCalledTimes(1);
  // });
});
