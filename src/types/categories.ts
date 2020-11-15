export interface CategoriesType {
  categories: Category[];
}

export interface Category {
  level: number;
  name: string;
  id: string;
  children: Category[];
}
