import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { Formik } from "formik";

import InputWrapper from "../InputWrapper";

const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

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
    props.label = "Modifier ton commentaire";

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

  it("should call updateComment and setIsClickEdit", async () => {
    const setIsClickEdit = jest.fn();
    const updateComment = jest.fn();
    props.setIsClickEdit = setIsClickEdit;
    props.updateComment = updateComment;
    props.variables.description = "descriptionss";

    const wrapper = mount(<InputWrapper {...props} />);
    wrapper.find("input[type='description']").simulate("change", {
      target: {
        name: "description",
        value: "description",
      },
    });

    //   wrapper.find('[type="submit"]').simmulte('click')
    // .find(`input[name="${name}"]`)

    wrapper.find("form").simulate("submit");
    await wait(200);

    expect(updateComment).toHaveBeenCalledTimes(1);
    expect(setIsClickEdit).toHaveBeenCalledTimes(1);
  });

  it("should call only setIsClickEdit", async () => {
    const setIsClickEdit = jest.fn();
    props.setIsClickEdit = setIsClickEdit;
    props.addComment = addComment;

    props.variables.description = "description";

    const wrapper = mount(<InputWrapper {...props} />);
    wrapper.find("input[type='description']").simulate("change", {
      target: {
        name: "description",
        value: "description",
      },
    });

    //   wrapper.find('[type="submit"]').simmulte('click')
    // .find(`input[name="${name}"]`)

    wrapper.find("form").simulate("submit");
    await wait(200);

    expect(updateComment).toHaveBeenCalledTimes(0);
    expect(setIsClickEdit).toHaveBeenCalledTimes(1);
  });

  it("should call addComment", async () => {
    props.label = "Ajouter un commentaire";
    const addComment = jest.fn();
    const setIsClickEdit = jest.fn();
    const updateComment = jest.fn();
    props.addComment = addComment;
    props.setIsClickEdit = setIsClickEdit;
    props.updateComment = updateComment;

    const wrapper = mount(<InputWrapper {...props} />);
    wrapper.find("input[type='description']").simulate("change", {
      target: {
        name: "description",
        value: "description",
      },
    });

    wrapper.find("form").simulate("submit");
    await wait(200);
    expect(addComment).toHaveBeenCalledTimes(1);
    expect(setIsClickEdit).toHaveBeenCalledTimes(0);
    expect(updateComment).toHaveBeenCalledTimes(0);
  });
});
