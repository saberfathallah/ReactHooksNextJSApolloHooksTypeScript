import React from "react";
import renderer from "react-test-renderer";

import Login from "../Login";
import { useMutation } from "../../../hooks/useMutation";

jest.mock("../../../hooks/useMutation", () => ({
  useMutation: jest.fn(),
}));

// @ts-ignore
useMutation.mockImplementation(() => [() => {}, { loading: false}]);


describe("<Login />", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(
      <Login />
    );

    expect(tree).toMatchSnapshot();
  });
})
