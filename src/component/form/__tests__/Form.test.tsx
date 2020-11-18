import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Form from "../Form";

const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

describe("BrandName", () => {
  it("should match snapshot with createUser", () => {
    const tree = renderer.create(<Form userFormType="inscription" />);

    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot with updateUser", () => {
    const tree = renderer.create(<Form userFormType="editProfil" />);

    expect(tree).toMatchSnapshot();
  });

  it("should display INSCRIPTION", () => {
    const wrapper = mount(<Form userFormType="inscription" />);
    expect(wrapper.text()).toContain("INSCRIPTION");
  });

  it("should display MODIFIER PROFIL", () => {
    const wrapper = mount(<Form userFormType="editProfil" />);
    expect(wrapper.text()).toContain("MODIFIER PROFIL");
  });

  it("should update name field on change", () => {
    const wrapper = mount(<Form userFormType="inscription" />);
    const nameInput = wrapper.find("input[type='name']");

    nameInput.simulate("change", {
      persist: () => {},
      target: {
        name: "name",
        value: "saber",
      },
    });

    expect(nameInput.html()).toMatch("saber");
  });

  it("should update email field on change", () => {
    const wrapper = mount(<Form userFormType="inscription" />);
    const nameInput = wrapper.find("input[type='email']");

    nameInput.simulate("change", {
      persist: () => {},
      target: {
        name: "email",
        value: "email@email.com",
      },
    });

    expect(nameInput.html()).toMatch("email@email.com");
  });

  it("should update password field on change", () => {
    const wrapper = mount(<Form userFormType="inscription" />);
    const nameInput = wrapper.find("input[type='password']");

    nameInput.simulate("change", {
      persist: () => {},
      target: {
        name: "password",
        value: "xxxxxxx",
      },
    });

    expect(nameInput.html()).toMatch("xxxxxxx");
  });

  it("should call createUser", async () => {
    const createUser = jest.fn();
    const updateUser = jest.fn();

    const wrapper = mount(
      <Form
        userFormType="inscription"
        createUser={createUser}
        updateUser={updateUser}
      />
    );
    wrapper.find("input[type='password']").simulate("change", {
      target: {
        name: "password",
        value: "xxxxx",
      },
    });

    wrapper.find("input[type='name']").simulate("change", {
      target: {
        name: "name",
        value: "saber",
      },
    });

    wrapper.find("input[type='email']").simulate("change", {
      target: {
        name: "email",
        value: "email@gmail.com",
      },
    });

    wrapper.find("form").simulate("submit");
    await wait(200);

    expect(updateUser).toHaveBeenCalledTimes(0);
    expect(createUser).toHaveBeenCalledTimes(1);
  });

  it("should call updateProfil", async () => {
    const createUser = jest.fn();
    const updateUser = jest.fn();

    const wrapper = mount(
      <Form
        userFormType="editProfil"
        createUser={createUser}
        updateUser={updateUser}
      />
    );
    wrapper.find("input[type='password']").simulate("change", {
      target: {
        name: "password",
        value: "xxxxx",
      },
    });

    wrapper.find("input[type='name']").simulate("change", {
      target: {
        name: "name",
        value: "saber",
      },
    });

    wrapper.find("input[type='email']").simulate("change", {
      target: {
        name: "email",
        value: "email@gmail.com",
      },
    });

    wrapper.find("form").simulate("submit");
    await wait(200);

    expect(updateUser).toHaveBeenCalledTimes(1);
    expect(createUser).toHaveBeenCalledTimes(0);
  });
});
