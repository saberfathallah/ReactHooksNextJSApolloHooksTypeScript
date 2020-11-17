import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import AllPosts from "../AllPosts";
import { useQuery } from "../../../hooks/useQuery";
import { useMutation } from "../../../hooks/useMutation";
import { POST } from "../../../../mock/postsMock";

jest.mock("../../../hooks/useQuery", () => ({
  useQuery: jest.fn(),
}));

jest.mock("../../../hooks/useMutation", () => ({
  useMutation: jest.fn(),
}));

// @ts-ignore
useQuery.mockImplementation(() => ({
  data: { getAllPosts: { posts: [], totalPosts: 23 } },
}));
// @ts-ignore
useMutation.mockImplementation(() => [() => {}, { loading: false }]);

describe("AllPosts", () => {
  const propsWithPosts = {
    userConnected: {
      id: "5fac3671dd9b1b079249d522",
      email: "sberrr@gmail.com",
      name: "sberrr",
    },
    data: { getAllPosts: { posts: [POST], totalPosts: 10 } },
    loading: false,
    page: 1,
    fetchMorePost: () => {},
  };

  const propsWithoutProps = {
    userConnected: {
      id: "5fac3671dd9b1b079249d522",
      email: "sberrr@gmail.com",
      name: "sberrr",
    },
    data: undefined,
    loading: true,
    page: 1,
    fetchMorePost: () => {},
  };

  it("should display snapshot", () => {
    const tree = renderer.create(<AllPosts {...propsWithPosts} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display loading snapshot", () => {
    const tree = renderer.create(<AllPosts {...propsWithoutProps} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display loading", () => {
    const wrapper = mount(<AllPosts {...propsWithoutProps} />);
    expect(wrapper.text()).toContain("loading");
  });

  it("should display posts", () => {
    const tree = mount(<AllPosts {...propsWithPosts} />);
    expect(tree.text()).toContain("corona france post");
  });
});
