import React from "react";
import renderer from "react-test-renderer";

import Comments from "../Comments";
import { useMutation } from "../../../hooks/useMutation";
import { USER_CONNECTED } from '../../../../mock/usersMock';

jest.mock("../../../hooks/useMutation", () => ({
  useMutation: jest.fn(),
}));

// @ts-ignore
useMutation.mockImplementation(() => [() => {}, { loading: false }]);

describe("Comments", () => {
  it("should display posts snapshot", () => {
    const props = {
      categoryId: "5e89c6458245cd0d75dec50f",
      comments: [
        {
          description: "comment bascket 2",
          id: "5e8e20ceb577a935e9c4cb45",
          postId: "5e8b5198780fc019e6d33595",
          userId: USER_CONNECTED,
        },
      ],
      creatorId: "5e89c2fd8245cd0d75dec501",
      postId: "5e89c6878245cd0d75dec510",
      userConnected: USER_CONNECTED,
      addComment: () => {},
      currentCategoryId:"6e89c6878245cd0d75dec510"
    };

    const tree = renderer.create(<Comments {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
