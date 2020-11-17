import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { mount } from "enzyme";

import Post from "../Post";
import { useQuery } from "../../../hooks/useQuery";
import { useMutation } from "../../../hooks/useMutation";
import { USER_CONNECTED } from "../../../../mock/usersMock";

jest.mock("../../../hooks/useQuery", () => ({
  useQuery: jest.fn(),
}));

jest.mock("../../../hooks/useMutation", () => ({
  useMutation: jest.fn(),
}));

// @ts-ignore
useQuery.mockImplementation(() => ({ data: "ddd" }));
// @ts-ignore
useMutation.mockImplementation(() => [() => {}, { loading: false }]);

const renderer = new ShallowRenderer();

describe("<Post />", () => {
  const props = {
    categoryId: "5e89c6458245cd0d75dec50f",
    comments: [],
    creatorId: "5e89c2fd8245cd0d75dec501",
    description: "corona france post",
    likes: ["5e8a26784c6b1d234b4c1a3f", "5e89c2fd8245cd0d75dec501"],
    postId: "5e89c6878245cd0d75dec510",
    userConnected: USER_CONNECTED,
    userName: "Saber Fathallah",
  };

  it("should match snapshot", () => {
    const tree = renderer.render(<Post {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display post", () => {
    const wrapper = mount(<Post {...props} />);
    expect(wrapper.text()).toContain("corona france post");
  });
});
