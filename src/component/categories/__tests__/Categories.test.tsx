import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";

import Categories from "../Categories";
import { useQuery } from "../../../hooks/useQuery";
import { useMutation } from "../../../hooks/useMutation";
import { CATEGORY } from '../../../../mock/categoriesMock';

jest.mock("../../../hooks/useQuery", () => ({
  useQuery: jest.fn(),
}));

jest.mock("../../../hooks/useMutation", () => ({
  useMutation: jest.fn(),
}));

// @ts-ignore
useQuery.mockImplementation(() => ({
  data: { getAllCategoriesQuery: { categories: [CATEGORY] } },
}));
// @ts-ignore
useMutation.mockImplementation(() => [() => {}, { loading: false }]);

describe("Categories", () => {
  it("should display posts snapshot", () => {
    const props = {
      selectCategoryId: () => '',
      changeCurrentCategory: () => '',
      isDisplayCategories: true,
      loading: false,
      data: {
        getAllCategoriesQuery: {
          categories: [CATEGORY],
        },
      },
    };
    const tree = renderer.create(<Categories {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it("should display loading snapshot", () => {
    const props = {
      selectCategoryId: () => '',
      changeCurrentCategory: () => '',
      isDisplayCategories: true,
      loading: true,
      data: undefined,
    };
    
    const wrapper = mount(<Categories {...props} />);
    expect(wrapper.text()).toContain("loading");
  });

  it("should call selectCategoryId when isDisplayCategories false", () => {
    const selectCategoryId = jest.fn();
    const changeCurrentCategory = jest.fn();

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
    wrapper.find('.MuiTreeItem-content').simulate('click')
    expect(selectCategoryId).toHaveBeenCalledTimes(1);
  });

  it("should call selectCategoryId when isDisplayCategories true", () => {
    const selectCategoryId = jest.fn();
    const changeCurrentCategory = jest.fn();

    const props = {
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
    
    const wrapper = mount(<Categories {...props} />);
    wrapper.find('.MuiTreeItem-content').simulate('click')
    expect(changeCurrentCategory).toHaveBeenCalledTimes(1);
  });
});
