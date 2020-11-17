import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

import { CategoriesType, Category } from "../../types/categories";
interface CategoriesResponse {
  getAllCategoriesQuery: CategoriesType;
}
interface Variables {
  variables: {
    currentCategoryId: string;
  };
}
interface CategoriesProps {
  loading: boolean;
  isDisplayCategories: boolean;
  selectCategoryId: (categoryId: string) => string;
  changeCurrentCategory: (variables: Variables) => string;
  data: CategoriesResponse | undefined;
}

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const categoryChildren: any = (
  children,
  changeCurrentCategory,
  isDisplayCategories,
  selectCategoryId
): Category[] =>
  children && children.length > 0
    ? children.map((child) => (
        <div key={child.id}>
          <TreeItem
            onClick={(): void => {
              if (isDisplayCategories) {
                changeCurrentCategory({
                  variables: { currentCategoryId: child.id },
                });
              } else {
                selectCategoryId(child.id);
              }
            }}
            nodeId={child.id}
            label={child.name}
          >
            {categoryChildren(
              child.children,
              changeCurrentCategory,
              isDisplayCategories,
              selectCategoryId
            )}
          </TreeItem>
        </div>
      ))
    : <></>;

const Categories: React.FC<CategoriesProps> = (props: CategoriesProps) => {
  const {
    selectCategoryId,
    isDisplayCategories,
    loading,
    data,
    changeCurrentCategory,
  } = props;

  if (loading) return <p>loading...</p>;

  const classes = useStyles();

  return (
    <div>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
      >
        {data.getAllCategoriesQuery.categories.map((category) => (
          <div key={category.id}>
            <TreeItem
              onClick={(): void => {
                if (isDisplayCategories) {
                  changeCurrentCategory({
                    variables: { currentCategoryId: category.id },
                  });
                } else {
                  selectCategoryId(category.id);
                }
              }}
              nodeId={category.id}
              label={category.name}
            >
              {categoryChildren(
                category.children,
                changeCurrentCategory,
                isDisplayCategories,
                selectCategoryId
              )}
            </TreeItem>
          </div>
        ))}
      </TreeView>
    </div>
  );
};

export default Categories;
