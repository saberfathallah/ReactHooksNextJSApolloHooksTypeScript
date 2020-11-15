import React from "react";
import renderer from "react-test-renderer";

import Comment from "../Comment";
import { useMutation } from "../../../hooks/useMutation";
import { USER_CONNECTED } from '../../../../mock/usersMock';

jest.mock("../../../hooks/useQuery", () => ({
  useQuery: jest.fn(),
}));

jest.mock("../../../hooks/useMutation", () => ({
  useMutation: jest.fn(),
}));

// @ts-ignore
useMutation.mockImplementation(() => [() => {}, { loading: false }]);

describe("Comment", () => {
  it("should display posts snapshot", () => {
    const props = {
      deleteComment: () => {},
      updateComment: () => {},
      categoryId: "5e89c6458245cd0d75dec50f",
      name: "commment",
      description: "description",
      creatorId: "5e89c2fd8245cd0d75dec501",
      postId: "5e89c6878245cd0d75dec510",
      userCommentedId: "5e89c6878245cd0d75dec510",
      id: "5e89c6878245cd0d75dec510",
      userConnected: USER_CONNECTED,
    };

    const tree = renderer.create(<Comment {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
