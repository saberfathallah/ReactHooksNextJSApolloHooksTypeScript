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
  it("should display snapshot", () => {
    const props = {
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

    const tree = renderer.create(<AllPosts {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display loading snapshot", () => {
    const props = {
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

    const tree = renderer.create(<AllPosts {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display loading", () => {
    const props = {
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

    const wrapper = mount(<AllPosts {...props} />)
    expect(wrapper.text()).toContain("loading");
  });
});
