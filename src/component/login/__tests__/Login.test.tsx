import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { Formik } from "formik";

import Login from "../Login";
import { useMutation } from "../../../hooks/useMutation";

jest.mock("../../../hooks/useMutation", () => ({
  useMutation: jest.fn(),
}));

// @ts-ignore
useMutation.mockImplementation(() => [() => {}, { loading: false }]);

describe("<Login />", () => {
  it("should match snapshot with error", () => {
    const props = {
      login: () => {},
      error: "error",
    }

    const tree = renderer.create(<Login  {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot with without error", () => {
    const props = {
      login: () => {},
      error: "",
    }

    const tree = renderer.create(<Login  {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should update email field on change", () => {
    const props = {
      login: () => {},
      error: "",
    }
    const wrapper = mount(<Login {...props} />);
    const emailInput = wrapper.find("input[name='email']");

    emailInput.simulate("change", {
      persist: () => {},
      target: {
        name: "email",
        value: "sabr@gmail.com",
      },
    });

    expect(emailInput.html()).toMatch("sabr@gmail.com");
  });

  // it("should return error for invalid email", () => {

  //   const props = {
  //     login: () => {},
  //     error: "",
  //   }
  //   const tree = mount(<Login {...props} />);

  //   const form = (props: any = { errors: {} }) =>
  //     tree.find(Formik).renderProp("children")(props);

  //   const formWithInvalidDescriptionErrors = form({
  //     values: {
  //       email: "zzzz",
  //     },
  //     errors: {
  //       email: "Invalid email addres",
  //     },
  //     touched: { description: true },
  //     isSubmitting: false,
  //   });

  //   expect(formWithInvalidDescriptionErrors.html()).toMatch(
  //     /Invalid email addres/
  //   );
  // });

  it("should update password field on change", () => {
    const props = {
      login: () => {},
      error: "",
    }
    const wrapper = mount(<Login {...props} />);
    const emailInput = wrapper.find("input[name='password']");

    emailInput.simulate("change", {
      persist: () => {},
      target: {
        name: "password",
        value: "xxxxxx",
      },
    });

    expect(emailInput.html()).toMatch("xxxxxx");
  });

  // it("should call logine", () => {
  //   const login = jest.fn();

  //   const props = {
  //     login,
  //     error: "",
  //   }

  //   const wrapper = mount(<Login {...props} />);
  //   wrapper.find("button").simulate("click");
  //   expect(login).toHaveBeenCalledTimes(1);
  // });
});
