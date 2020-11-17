import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Like from "../Like";

describe("Like", () => {
  const addLike = jest.fn();
  const dislike = jest.fn();

  const props = {
    dislike: dislike,
    addLike: addLike,
    nombreOffLikes: 1,
    isLiked: true,
    postId: "5e89c6878245cd0d75dec510",
  };

  it("should display dislike snapshot", () => {
    const tree = renderer.create(<Like {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display like snapshot", () => {
    props.isLiked = false;

    const tree = renderer.create(<Like {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display 0 when nombreOffLikes===null likes snapshot", () => {
    props.isLiked = true;
    props.nombreOffLikes = null;

    const tree = renderer.create(<Like {...props} />);
    expect(tree).toMatchSnapshot();
  });


  it("shouldn't call dislike should call addLike", () => {
    props.isLiked = false;
    props.nombreOffLikes = 1;

    const wrapper = mount(<Like {...props} />);
    wrapper.find("button").simulate("click");
    expect(addLike).toHaveBeenCalledTimes(1);
    expect(dislike).not.toHaveBeenCalled();
  });

  it("shouldn't call addLike should call dislike", () => {
    const addLike = jest.fn();
    props.isLiked = true;
    props.addLike = addLike;

    const wrapper = mount(<Like {...props} />);
    wrapper.find("button").simulate("click");
    expect(dislike).toHaveBeenCalledTimes(1);
    expect(addLike).not.toHaveBeenCalled();
  });
});
