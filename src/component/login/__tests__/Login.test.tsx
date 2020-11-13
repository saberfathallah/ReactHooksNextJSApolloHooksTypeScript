import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import LOGIN_MUTATION from '@graphql/users/mutations/loginMutation';
import { MockedProvider } from '@apollo/client/testing';

import Login from "../Login";

const renderer = new ShallowRenderer();

const mocks = [
  {
    request: {
      query: LOGIN_MUTATION,
      variables: {
        loginInput: { email: "saber@gmail.com", password: "xxxxxx"},
      },
    },
    result: {
      data: {
        login: { user: {   email: "email",
          name: "name",
          password: "password", }, token: 'token' },
      },
    },
  },
];


describe("<Login />", () => {
  it("should match snapshot", () => {
    const tree = renderer.render(
      <MockedProvider mocks={mocks}>
      <Login />
      </MockedProvider>,

    );
    expect(tree).toMatchSnapshot();
  });
})
