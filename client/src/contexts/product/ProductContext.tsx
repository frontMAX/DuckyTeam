import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { ProductFetch } from '../../Api/Api';

interface ProductContextValue {
  isLoading: boolean;
  products: Product[];
  fetchProducts: () => void;
  fetchProduct: (id: string) => void;
  createProduct: () => void;
  updateProduct: () => void;
  deleteProduct: () => void;
}

export enum MockedCategories {
  Famous = 'Kända',
  Animals = 'Djur',
  Hobby = 'Hobby',
  Misc = 'Övriga',
}

export const Categories: MockedCategories[] = [
  MockedCategories.Famous,
  MockedCategories.Animals,
  MockedCategories.Hobby,
  MockedCategories.Misc,
];

/** Remember this is used backendside as well, update both of needed. */
export interface Product {
  _id: number;
  name: string;
  price: number;
  quantity: number;
  details: string;
  category: MockedCategories[];
  imageUrl: string;
  orderedQuantity?: number;
}


// type PContext = {
//   products: ProductType[];
//   dispatch: React.Dispatch<ProductActions>;
//   createProduct: (product: Product) => void;
//   updateProduct: (product: Product) => void;
//   deleteProduct: (id: number) => void;
// };

export const ProductContext = React.createContext<ProductContextValue>({
  isLoading: false,
  products: [],
  fetchProducts: () => {},
  fetchProduct: (id: string) => {},
  createProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {}
});

export const ProductProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);



  const getProduct = async (product: Promise<Product>) => {
    setIsLoading(true);

    return ProductFetch(product)
      .then((product) => {
        setProducts(product);
        setIsLoading(false);
      });
  };

  const fetchProducts = useCallback(() => {
    axios.get<Product[]>("http://localhost:5001/api/product").then((res) => {
      setProducts(res.data);
    })
  }, [])

  const fetchProduct = useCallback((id: string) => {
    axios.get<Product>(`http://localhost:5001/api/product/${id}`).then((res) => {
      setProducts([res.data]);
    })
  }, [])

  const createProduct =()=>{
    
  } 

  const updateProduct = ()=>{

  } 

  const deleteProduct =()=>{

  }

  return (
    <ProductContext.Provider value={{ products, isLoading, fetchProduct, fetchProducts, createProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

export const useProduct = () => useContext(ProductContext);