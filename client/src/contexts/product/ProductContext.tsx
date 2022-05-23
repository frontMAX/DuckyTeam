import React, { createContext, useContext, useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { ProductFetch } from '../../Api/Api';
import { ProductInterface } from '../../InterFaces';

interface ProductContextValue {
  isLoading: boolean;
  product?: ProductInterface;
}
export const ProductContext = React.createContext<ProductContextValue>({
  isLoading: false,
  product: { id: 0, name: '', price: 0, details: '', image: '',category:'' },
});

export const ProductProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [product, setProduct] = React.useState<ProductInterface>();
  const [isLoading, setIsLoading] = useState(false);



  const getProduct = async (product: Promise<ProductInterface>) => {
    setIsLoading(true);

    return ProductFetch(product)
      .then((product) => {
        setProduct(product);
        setIsLoading(false);
	    
        // throw e;
      });
  };

  useEffect(() => {
    axios.get("http://localhost:5001/api/product", { withCredentials: true }).then((res: AxiosResponse) => {
      setProduct(res.data);
    })
}, []);

  return (
    <ProductContext.Provider value={{ product, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

export const useProduct = () => useContext(ProductContext);