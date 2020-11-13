import React from "react";
import renderer from "react-test-renderer";
import Form from "../Form";

describe("BrandName", () => {
  it("should match snapshot", () => {
      const user = { email: "saber@gmail.com" }
    const tree = renderer.create(
      <Form user={user} />
    );

    expect(tree).toMatchSnapshot();
  });
});