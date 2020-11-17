import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import ContentSearch from "../ContentSearch";
import { useQuery } from "../../../hooks/useQuery";
import { useMutation } from "../../../hooks/useMutation";

import { POST } from "../../../../mock/postsMock";
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

describe("ContentSearch", () => {
  it("should display posts snapshot", () => {
    const props = {
      loading: false,
      data: {
        search: {
          posts: [POST],
        },
      },
      userConnected: USER_CONNECTED,
    };
    const tree = renderer.create(<ContentSearch {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display loading snapshot", () => {
    const props = {
      loading: true,
      data: undefined,
      userConnected: USER_CONNECTED,
    };
    const tree = renderer.create(<ContentSearch {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display loading", () => {
    const props = {
      loading: true,
      data: undefined,
      userConnected: USER_CONNECTED,
    };
    const tree = mount(<ContentSearch {...props} />);
    expect(tree.text()).toContain("loading");
  });

  it("should display posts", () => {
    const props = {
      loading: false,
      data: {
        search: {
          posts: [POST],
        },
      },
      userConnected: USER_CONNECTED,
    };
    const tree = mount(<ContentSearch {...props} />);
    expect(tree.text()).toContain("corona france post");
  });
});
