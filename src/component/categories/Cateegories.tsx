import React from 'react';
import { useQuery } from '@apollo/react-hooks';

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
}
  

const Categories: React.FC<{}> = () => {
  const { data, loading } = useQuery<ICategoriesResponse>(CATEGORIES);
  if (loading) return <p>loading...</p>

  return (
    <div>
      {
        data.getAllCategoriesQuery.categories.map(category => <p key={category.id}>{category.name}</p>)
      }
    </div>
  );
}
  
export default Categories;
