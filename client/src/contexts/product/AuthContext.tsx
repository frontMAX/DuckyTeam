import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import Axios, { AxiosResponse } from "axios";
import { ProductInterface } from "../../InterFaces";

export const APIContext = createContext<any>({});
export default function Context(props: PropsWithChildren<any>) {
  const [product, setProduct] = useState<ProductInterface>();
  useEffect(() => {
    Axios.get("http://localhost:5001/api/product", {
      withCredentials: true,
    }).then((res: AxiosResponse) => {
      setProduct(res.data);
      console.log(product?.name);
    });
  }, [product]);

  return (
    <APIContext.Provider value={product}>{props.children}</APIContext.Provider>
  );
}
