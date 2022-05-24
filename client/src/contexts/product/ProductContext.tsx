import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { ProductFetch } from '../../Api/Api';
import { ProductInterface } from '../../InterFaces';

interface ProductContextValue {
  isLoading: boolean;
  products: ProductInterface[];
  fetchProducts: () => void;
}

/** Remember this is used backendside as well, update both of needed. */
export interface Product {
  id: Number;
  name: string;
  price: number;
  quantity: number;
  details: string;
  category: string;
  imageUrl: string;
  orderedQuantity?: Number;
}


export interface ProductType extends Product {}

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
  fetchProducts: () => {}
});

export const ProductProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [products, setProducts] = React.useState<ProductInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);



  const getProduct = async (product: Promise<ProductInterface>) => {
    setIsLoading(true);

    return ProductFetch(product)
      .then((product) => {
        setProducts(product);
        setIsLoading(false);
	    
        // throw e;
      });
  };

  const fetchProducts = useCallback(() => {
    axios.get<ProductInterface[]>("http://localhost:5001/api/product").then((res) => {
      setProducts(res.data);
    })
  }, [])

  return (
    <ProductContext.Provider value={{ products, isLoading, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

export const useProduct = () => useContext(ProductContext);