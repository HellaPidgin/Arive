export interface CategoriesType {
  name: string;
  id: string;
  productIds: number[];
} 
export interface CategoryValueType {
  name: string;
  brand: {
      name: string;
      image: any;
  }
  Price: number;
} 