import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import { Formik } from "formik";

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

  it("should update description field on change", () => {
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
    const wrapper = mount(<Comments {...props} />);
    const descriptionInput = wrapper.find("input");

    descriptionInput.simulate("change", {
      persist: () => {},
      target: {
        name: "description",
        value: "new comment",
      },
    });

    expect(descriptionInput.html()).toMatch("new comment");
  });

  it("should return error for invalid comment", () => {
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
    const tree = mount(<Comments {...props} />);

    const form = (props: any = { errors: {} }) =>
      tree.find(Comments).find(Formik).renderProp("children")(props);

    const formWithInvalidDescriptionErrors = form({
      values: {
        description: "",
      },
      errors: {
        description: "Required",
      },
      touched: { description: true },
      isSubmitting: false,
    });

    expect(formWithInvalidDescriptionErrors.html()).toMatch(/Required/);
  });

  // it("should call addComment", () => {
  //   const addComment = jest.fn();

  //   const props = {
  //     categoryId: "5e89c6458245cd0d75dec50f",
  //     comments: [
  //       {
  //         description: "comment bascket 2",
  //         id: "5e8e20ceb577a935e9c4cb45",
  //         postId: "5e8b5198780fc019e6d33595",
  //         userId: USER_CONNECTED,
  //       },
  //     ],
  //     creatorId: "5e89c2fd8245cd0d75dec501",
  //     postId: "5e89c6878245cd0d75dec510",
  //     userConnected: USER_CONNECTED,
  //     addComment,
  //     currentCategoryId:"6e89c6878245cd0d75dec510"
  //   };

  //   const wrapper = mount(<Comments {...props} />);
  //   wrapper.find("button").simulate("click");
  //   expect(addComment).toHaveBeenCalledTimes(1);
  // });
});
