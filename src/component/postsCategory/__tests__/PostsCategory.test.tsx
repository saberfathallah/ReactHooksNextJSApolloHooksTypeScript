import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import PostsCategory from "../PostsCategory";
import { POST } from "../../../../mock/postsMock";
import { USER_CONNECTED } from "../../../../mock/usersMock";
import { useQuery } from "../../../hooks/useQuery";
import { useMutation } from "../../../hooks/useMutation";

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

describe("PostsCategory", () => {
  const props = {
    loading: false,
    data: {
      getPostsByCategoryId: {
        posts: [POST],
      },
    },
    userConnected: USER_CONNECTED,
  };

  it("should display post", () => {
    const wrapper = mount(<PostsCategory {...props} />);
    expect(wrapper.text()).toContain("corona france post");
  });

  it("should display posts snapshot", () => {
    const tree = renderer.create(<PostsCategory {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot loading", () => {
    props.loading = true;
    props.data = undefined;

    const tree = renderer.create(<PostsCategory {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display loading", () => {
    const wrapper = mount(<PostsCategory {...props} />);
    expect(wrapper.text()).toContain("loading...");
  });
});
