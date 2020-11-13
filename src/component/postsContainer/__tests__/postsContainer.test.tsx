import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import { MockedProvider } from "@apollo/client/testing";

import PostsContainer from "../PostsContainer";
import GET_SEARCH_QUERY from '@graphql/client/queries/getSearchQuery';

const renderer = new ShallowRenderer();

describe("<PostsContainer />", () => {
  it("should display ContentSearch snapshot", () => {
    const mocks = [
        {
          request: {
            query: GET_SEARCH_QUERY,
          },
          data: {
            query: "s",
          },
        },
      ];

    const tree = renderer.render(
      <MockedProvider mocks={mocks}>
        <PostsContainer />
      </MockedProvider>
    );
    expect(tree).toMatchSnapshot();
  });

});
