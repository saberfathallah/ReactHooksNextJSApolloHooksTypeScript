import React from "react";

import Categories from "./Categories";
import { useQuery } from "../../hooks/useQuery";
import { useMutation } from "../../hooks/useMutation";
import CATEGORIES from "@graphql/categories/queries/getAllCategories";
import CHANGE_CURRENT_CATEGORY from "@graphql/client/mutation/changeCurrentCategory";

// interface CategoriesProps {
//   isDisplayCategories: boolean;
//   selectCategoryId: (categoryId: string) => string;
// }

const CategoriesContainer = (props) => {
  const { selectCategoryId, isDisplayCategories } = props;
  const { data, loading } = useQuery(CATEGORIES, { variables: false });
  const [changeCurrentCategory] = useMutation(CHANGE_CURRENT_CATEGORY, {
    variables: false,
  });

  return (
    <Categories
      selectCategoryId={selectCategoryId}
      isDisplayCategories={isDisplayCategories}
      data={data}
      loading={loading}
      changeCurrentCategory={changeCurrentCategory}
    />
  );
};

export default CategoriesContainer;
