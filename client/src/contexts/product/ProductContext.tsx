import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios, { AxiosResponse } from "axios";

interface ProductContextValue {
  isLoading: boolean;
  products: Product[];
  fetchProducts: () => void;
  fetchProduct: (id: string) => void;
  createProduct: () => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

export enum MockedCategories {
  Famous = "Kända",
  Animals = "Djur",
  Hobby = "Hobby",
  Misc = "Övriga",
}

export const Categories: MockedCategories[] = [
  MockedCategories.Famous,
  MockedCategories.Animals,
  MockedCategories.Hobby,
  MockedCategories.Misc,
];

/** Remember this is used backendside as well, update both of needed. */
export interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  details: string;
  category: MockedCategories[];
  imageUrl: string;
  orderedQuantity?: number;
}

export const ProductContext = React.createContext<ProductContextValue>({
  isLoading: false,
  products: [],
  fetchProducts: () => {},
  fetchProduct: (id: string) => {},
  createProduct: () => {},
  updateProduct: (product: Product) => {},
  deleteProduct: (id: string) => {},
});

export const ProductProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(() => {
    axios.get<Product[]>("http://localhost:5001/api/product").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const fetchProduct = useCallback((id: string) => {
    axios
      .get<Product>(`http://localhost:5001/api/product/${id}`)
      .then((res) => {
        setProducts([res.data]);
      });
  }, []);

  const createProduct = useCallback(() => {
    axios.post<Product>("http://localhost:5001/api/product").then((res) => {
      setProducts([...products, res.data]);
    });
  }, []);

  const updateProduct = useCallback((newProductData: Product) => {
    axios
      .put<Product>(`http://localhost:5001/api/product/${newProductData._id}`, {
        newProductData,
      })
      .then((res) => {
        const productIndex = products.findIndex((product: Product) => {
          return (product._id = newProductData._id);
        });
        products[productIndex] = res.data;
        setProducts(products);
      });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    axios
      .delete<Product>(`http://localhost:5001/api/product/${id}`)
      .then((res) => {
        const productIndex = products.findIndex((product: Product) => {
          return (product._id = id);
        });
        setProducts([...products.splice(productIndex, 1)]);
      });
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        fetchProduct,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

export const useProduct = () => useContext(ProductContext);
