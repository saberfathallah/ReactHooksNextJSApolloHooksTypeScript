import React from "react";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import { Formik } from 'formik';

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

describe("NewPost", () => {
  const setCategoryId = jest.fn();
  const addPost = jest.fn();
  const handleClickOpen = jest.fn();
  const handleClose = jest.fn();
  it("should  snapshot open===false", () => {
    const props = {
      categoryId: "",
      setCategoryId: () => "",
      addPost: () => {},
      open: false,
      handleClickOpen: () => () => {},
      handleClose: () => () => {},
    };
    const tree = renderer.create(<NewPost {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should  snapshot open===true", () => {
    const props = {
      categoryId: "",
      setCategoryId: () => "",
      addPost: () => {},
      open: true,
      handleClickOpen: () => () => {},
      handleClose: () => () => {},
    };
    const rendererComponent = new ShallowRenderer();

    const tree = rendererComponent.render(<NewPost {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should call handleClickOpen", () => {
    const props = {
      categoryId: "",
      setCategoryId: setCategoryId,
      addPost: addPost,
      open: false,
      handleClickOpen: handleClickOpen,
      handleClose: handleClose,
    }
    const wrapper = mount(<NewPost {...props} />);

    wrapper.find("button").simulate("click");
    expect(handleClickOpen).toHaveBeenCalledTimes(1);
  });

  it("should display Nouvelle publication", () => {
    const props = {
      categoryId: "",
      setCategoryId: setCategoryId,
      addPost: addPost,
      open: true,
      handleClickOpen: handleClickOpen,
      handleClose: handleClose,
    }

    const wrapper = shallow(<NewPost {...props} />);
    console.log("wrapper", wrapper);
    expect(wrapper.text()).toContain("Nouvelle publication");
  });

  it('should update password field on change', () => {

    const props = {
      categoryId: "",
      setCategoryId: setCategoryId,
      addPost: addPost,
      open: true,
      handleClickOpen: handleClickOpen,
      handleClose: handleClose,
    }
    const wrapper = mount(<NewPost {...props} />);
    const descriptionInput = wrapper.find("input[name='description']");

    descriptionInput.simulate('change', {
      persist: () => {},
      target: {
        name: 'description',
        value: 'new post'
      }
    });

    expect(descriptionInput.html()).toMatch('new post');
  });

  it('should return error for invalid description', () => {
    const props = {
      categoryId: "",
      setCategoryId: setCategoryId,
      addPost: addPost,
      open: true,
      handleClickOpen: handleClickOpen,
      handleClose: handleClose,
    }
    const tree = mount(<NewPost {...props} />);

    const form = (props: any = { errors: {} }) =>
      tree
        .find(NewPost)
        .find(Formik)
        .renderProp('children')(props);

    const formWithInvalidDescriptionErrors = form({
      values: {
        description: ''
      },
      errors: {
        description: 'Required'
      },
      touched: { description: true },
      isSubmitting: false
    });

    expect(formWithInvalidDescriptionErrors.html()).toMatch(/Required/);
  });

  // it("should click addPost", () => {
  //   const setCategoryId = jest.fn();
  //   const addPost = jest.fn();
  //   const handleClickOpen = jest.fn();
  //   const handleClose = jest.fn();

  //   const props = {
  //     categoryId: "sssss",
  //     setCategoryId: setCategoryId,
  //     addPost: addPost,
  //     open: true,
  //     handleClickOpen: handleClickOpen,
  //     handleClose: handleClose,
  //   }
  //   const tree = mount(<NewPost {...props} />);

  //   const form: any = (props: any = { errors: {} }) =>
  //   tree
  //     .find(NewPost)
  //     .find(Formik)
  //     .renderProp('children')(props);


  //   const formFormik = form({
  //     values: {
  //       description: 'description'
  //     },
  //     errors: {},
  //     touched: { description: true },
  //     isSubmitting: false
  //   });

  //   console.log("formFormik", formFormik)
  //   formFormik.find(".button").simulate("click");
  //   expect(handleClose).toHaveBeenCalledTimes(1);
  // });

});
