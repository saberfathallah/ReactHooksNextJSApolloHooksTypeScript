import React from "react";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";

import { useQuery } from "../../../hooks/useQuery";
import { useMutation } from "../../../hooks/useMutation";

import { shallow, mount } from "enzyme";

import NewPost from "../NewPost";

jest.mock("../../../hooks/useQuery", () => ({
  useQuery: jest.fn(),
}));

jest.mock("../../../hooks/useMutation", () => ({
  useMutation: jest.fn(),
}));

// @ts-ignore
useQuery.mockImplementation(() => ({
  data: { getAllCategoriesQuery: { categories: [] } },
}));
// @ts-ignore
useMutation.mockImplementation(() => [() => {}, { loading: false }]);

const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

describe("NewPost", () => {
  const setCategoryId = jest.fn();
  const addPost = jest.fn();
  const handleClickOpen = jest.fn();
  const handleClose = jest.fn();

  const props = {
    categoryId: "",
    setCategoryId,
    addPost,
    open: false,
    handleClickOpen,
    handleClose,
  };
  it("should  snapshot open===false", () => {
    const tree = renderer.create(<NewPost {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should  snapshot open===true", () => {
    props.open = true;

    const rendererComponent = new ShallowRenderer();
    const tree = rendererComponent.render(<NewPost {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should call handleClickOpen", () => {
    props.open = false;

    const wrapper = mount(<NewPost {...props} />);
    wrapper.find("button").simulate("click");
    expect(handleClickOpen).toHaveBeenCalledTimes(1);
  });

  it("should display Nouvelle publication", () => {
    props.open = true;

    const wrapper = shallow(<NewPost {...props} />);
    expect(wrapper.text()).toContain("Nouvelle publication");
  });

  it("should update description field on change", () => {
    const wrapper = mount(<NewPost {...props} />);
    const descriptionInput = wrapper.find("input[name='description']");

    descriptionInput.simulate("change", {
      persist: () => {},
      target: {
        name: "description",
        value: "new post",
      },
    });

    expect(descriptionInput.html()).toMatch("new post");
  });

  it("should return error for invalid description", () => {
    const tree = mount(<NewPost {...props} />);

    const form = (props: any = { errors: {} }) =>
      tree.find(NewPost).find(Formik).renderProp("children")(props);

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

  it("should call handleClose", () => {
    const wrapper = mount(<NewPost {...props} />);
    const button = wrapper.findWhere(
      (node) => node.is(Button) && node.text() === "Annuler"
    );
    button.simulate("click");
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("should call addPost and handleClose", async () => {
    const handleClose = jest.fn();
    props.handleClose = handleClose;
    props.categoryId = "categoryId";
    const wrapper = mount(<NewPost {...props} />);
    wrapper.find("input[type='description']").simulate("change", {
      target: {
        name: "description",
        value: "description",
      },
    });

    const button = wrapper.findWhere(
      (node) => node.is(Button) && node.text() === "Ajouter"
    );
    button.simulate("click");
    await wait(200);

    expect(addPost).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("shouldn't call addPost handleClose", async () => {
    const addPost = jest.fn();
    const handleClose = jest.fn();

    props.addPost = addPost;
    props.handleClose = handleClose;
    props.categoryId = "";
    const wrapper = mount(<NewPost {...props} />);
    wrapper.find("input[type='description']").simulate("change", {
      target: {
        name: "description",
        value: "description",
      },
    });

    const button = wrapper.findWhere(
      (node) => node.is(Button) && node.text() === "Ajouter"
    );
    button.simulate("click");
    await wait(200);

    expect(addPost).toHaveBeenCalledTimes(0);
    expect(handleClose).toHaveBeenCalledTimes(0);
  });
});
