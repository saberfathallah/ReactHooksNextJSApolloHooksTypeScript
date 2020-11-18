import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Login from "../Login";
const wait = (amount = 0) =>
  new Promise(resolve => setTimeout(resolve, amount));

describe("<Login />", () => {
  const props = {
    login: () => {},
    error: "error",
  };
  it("should match snapshot with error", () => {
    const tree = renderer.create(<Login {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot with without error", () => {
    props.error = "";

    const tree = renderer.create(<Login {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should update email field on change", () => {
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

  it("should update password field on change", () => {
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

  it("should call login", async () => {
    const login = jest.fn();
    props.login = login;
    const wrapper = mount(<Login {...props} />);
    const email = "test@toast.com";

    wrapper.find("input[type='email']").simulate("change", {
      target: {
        name: "email",
        value: email,
      },
    });

    wrapper.find("input[type='password']").simulate("change", {
      target: {
        name: "password",
        value: "password",
      },
    });

    wrapper.find("form").simulate("submit");
    await wait(200);
    expect(login).toHaveBeenCalledTimes(1);
  });
});
