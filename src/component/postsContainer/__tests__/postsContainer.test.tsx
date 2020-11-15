import React from "react";
import renderer from "react-test-renderer";

import PostsContainer from "../PostsContainer";
import { useQuery } from "../../../hooks/useQuery";
import { USER_CONNECTED } from "../../../../mock/usersMock";

jest.mock("../../../hooks/useQuery", () => ({
  useQuery: jest.fn(),
}));

// @ts-ignore
useQuery.mockImplementation(() => ({
  data: { getUserDetails: { user: USER_CONNECTED }, getPostsByCategoryId: { posts: [] } },
}));

describe("PostsContainer", () => {
  it("should display snapshot", () => {
    const props = {
      currentCategoryId: "5e89c6028245cd0d75dec50b",
      data: { getUserDetails: { user: USER_CONNECTED } },
      dataSearchQuery: { query: "" },
      loading: false,
      loadingSearchQuery: false,
      loadingUserDetails: false,
    };
    const tree = renderer.create(<PostsContainer {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display loadiing snapshot", () => {
    const props = {
      currentCategoryId: "5e89c6028245cd0d75dec50b",
      data: { getUserDetails: { user: USER_CONNECTED } },
      dataSearchQuery: { query: "" },
      loading: true,
      loadingSearchQuery: false,
      loadingUserDetails: false,
    };
    const tree = renderer.create(<PostsContainer {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
