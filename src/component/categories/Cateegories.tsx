import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

import CATEGORIES from '../../graphql/categories/queries/getAllCategories';

interface ICategoriesResponse {
  getAllCategoriesQuery: ICategories;
}
  
interface ICategories {
  categories: ICategory[]
}
  
interface ICategory {
  level: number;
  name: string;
  id: string;
  children: ICategory[];
}

const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

const categoryChildren:any = (children): ICategory[] => 
  children && children.length > 0 ? 
    children.map(child => (
      <div key={child.id}>
        <TreeItem
          nodeId={child.id}
          label={child.name}>
          {categoryChildren(child.children)}
        </TreeItem>
      </div>
    ))
  :
  null;
  

const Categories: React.FC<{}> = () => {
  const classes = useStyles();
  const { data, loading } = useQuery<ICategoriesResponse>(CATEGORIES);

  if (loading) return <p>loading...</p>

  return (
    <div>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
      >
      {
        data.getAllCategoriesQuery.categories.map(category =>
          (
            <div key={category.id}>
              <TreeItem 
                nodeId={category.id}
                label={category.name}
               >
                {categoryChildren(category.children)}
              </TreeItem>           
            </div>
          )
        )
      }
      </TreeView>
    </div>
  );
}
  
export default Categories;
