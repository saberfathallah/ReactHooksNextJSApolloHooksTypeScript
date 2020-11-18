import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import PostsContainer from "../PostsContainer";
import { USER_CONNECTED } from "../../../../mock/usersMock";
import { POST } from "../../../../mock/postsMock";
import { useQuery } from "../../../hooks/useQuery";
import { useMutation } from "../../../hooks/useMutation";

jest.mock("../../../hooks/useQuery", () => ({
  useQuery: jest.fn(),
}));

jest.mock("../../../hooks/useMutation", () => ({
  useMutation: jest.fn(),
}));

// @ts-ignore
useQuery.mockImplementation(() => ({
  data: {
    getUserDetails: { user: USER_CONNECTED },
    getPostsByCategoryId: { posts: [POST] },
  },
}));

// @ts-ignore
useMutation.mockImplementation(() => [() => {}, { loading: false }]);

describe("PostsContainer", () => {
  const props = {
    currentCategoryId: "5e89c6028245cd0d75dec50b",
    data: { getUserDetails: { user: USER_CONNECTED } },
    dataSearchQuery: { query: "" },
    loading: false,
    loadingSearchQuery: false,
    loadingUserDetails: false,
  };

  it("should match snapshot", () => {
    const tree = renderer.create(<PostsContainer {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display posts by categoryID", () => {
    const wrapper = mount(<PostsContainer {...props} />);
    expect(wrapper.text()).toContain("corona france post");
  });

  it("should display all posts", () => {
    // @ts-ignore
    useQuery.mockImplementation(() => ({
      data: {
        getUserDetails: { user: USER_CONNECTED },
        getAllPosts: { posts: [POST], totalPosts: 1 },
      },
    }));
    props.currentCategoryId = "";

    const wrapper = mount(<PostsContainer {...props} />);
    expect(wrapper.text()).toContain("corona france post");
  });

  it("should match lading snapshot", () => {
    props.loading = true;

    const tree = renderer.create(<PostsContainer {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display loading", () => {
    const wrapper = mount(<PostsContainer {...props} />);
    expect(wrapper.text()).toContain("laoding....");
  });

  it("should match snapshot searchcontent", () => {
    props.loading = false;

    props.dataSearchQuery.query = "corona";
    // @ts-ignore
    useQuery.mockImplementation(() => ({
      data: {
        search: { posts: [POST] },
        laoding: false,
      },
    }));
    const tree = renderer.create(<PostsContainer {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display searchcontent", () => {
    const wrapper = mount(<PostsContainer {...props} />);
    expect(wrapper.text()).toContain("corona france post");
  });
});
