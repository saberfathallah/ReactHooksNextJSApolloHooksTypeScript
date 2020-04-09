import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import CATEGORIES from '@graphql/categories/queries/getAllCategories';
import CHANGE_CURRENT_CATEGORY from '@graphql/client/mutation/changeCurrentCategory';

interface CategoriesResponse {
  getAllCategoriesQuery: Categories;
}

interface Categories {
  categories: Category[];
}

interface Category {
  level: number;
  name: string;
  id: string;
  children: Category[];
}

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const categoryChildren: any = (
  children, changeCurrentCategory, isDisplayCategories, selectCategoryId,
): Category[] => (children && children.length > 0
  ? children.map((child) => (
    <div key={child.id}>
      <TreeItem
        onClick={(): void => {
          if (isDisplayCategories) {
            changeCurrentCategory({ variables: { currentCategoryId: child.id } });
          } else {
            selectCategoryId(child.id);
          }
        }}
        nodeId={child.id}
        label={child.name}
      >
        {categoryChildren(
          child.children, changeCurrentCategory, isDisplayCategories, selectCategoryId,
        )}
      </TreeItem>
    </div>
  ))
  : null);

const Categories: React.FC<any> = (props: any) => {
  const { selectCategoryId, isDisplayCategories } = props;
  const classes = useStyles();
  const { data, loading } = useQuery<CategoriesResponse>(CATEGORIES);
  const [changeCurrentCategory] = useMutation(CHANGE_CURRENT_CATEGORY);

  if (loading) return <p>loading...</p>;

  return (
    <div>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
      >
        {
          data.getAllCategoriesQuery.categories.map((category) => (
            <div key={category.id}>
              <TreeItem
                onClick={(): void => {
                  if (isDisplayCategories) {
                    changeCurrentCategory({ variables: { currentCategoryId: category.id } });
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
                  selectCategoryId,
                )}
              </TreeItem>
            </div>
          ))
        }
      </TreeView>
    </div>
  );
};

export default Categories;
