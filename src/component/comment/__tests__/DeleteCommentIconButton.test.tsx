import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import DeleteCommentIconButton from "../DeleteCommentIconButton";

describe("DeleteCommentIconButton", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(
      <DeleteCommentIconButton
        deleteComment={() => {}}
        postId="postId"
        commentId="commentId"
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("shouldn't call addLike should call dislike", () => {
    const deleteComment = jest.fn();
    const wrapper = mount(
      <DeleteCommentIconButton
        deleteComment={deleteComment}
        postId="postId"
        commentId="commentId"
      />
    );
    wrapper.find("button").simulate("click");
    expect(deleteComment).toHaveBeenCalledTimes(1);
  });
});
