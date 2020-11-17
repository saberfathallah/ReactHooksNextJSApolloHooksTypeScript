import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Categories from "../Categories";
import { CATEGORY } from "../../../../mock/categoriesMock";

describe("Categories", () => {
  const selectCategoryId = jest.fn();
  const changeCurrentCategory = jest.fn();
  const propsWithCategories = {
    selectCategoryId,
    changeCurrentCategory,
    isDisplayCategories: true,
    loading: false,
    data: {
      getAllCategoriesQuery: {
        categories: [CATEGORY],
      },
    },
  };

  it("should display categories snapshot", () => {
    const tree = renderer.create(<Categories {...propsWithCategories} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display loading snapshot", () => {
    const props = {
      selectCategoryId,
      changeCurrentCategory,
      isDisplayCategories: true,
      loading: true,
      data: undefined,
    };

    const wrapper = mount(<Categories {...props} />);
    expect(wrapper.text()).toContain("loading");
  });

  it("should call selectCategoryId when isDisplayCategories false", () => {
    const props = {
      selectCategoryId,
      changeCurrentCategory,
      isDisplayCategories: false,
      loading: false,
      data: {
        getAllCategoriesQuery: {
          categories: [CATEGORY],
        },
      },
    };

    const wrapper = mount(<Categories {...props} />);
    wrapper.find(".MuiTreeItem-content").simulate("click");
    expect(selectCategoryId).toHaveBeenCalledTimes(1);
  });

  it("should call selectCategoryId when isDisplayCategories true", () => {
    const wrapper = mount(<Categories {...propsWithCategories} />);
    wrapper.find(".MuiTreeItem-content").simulate("click");
    expect(changeCurrentCategory).toHaveBeenCalledTimes(1);
  });

  it("should display categories", () => {
    const wrapper = mount(<Categories {...propsWithCategories} />);
    expect(wrapper.text()).toContain("Sport");
  });
});
