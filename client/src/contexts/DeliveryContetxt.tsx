import { time } from "console";
import React, { createContext, FC, useContext, useState } from "react";
import { number } from "yup";
import { DeliveryFetch } from "../Api/Api";

import { DeliveryInterface } from "../InterFaces";

interface DeliveryContextValue {
  delivery?: DeliveryInterface;
  isLoading: boolean;
  fetchDelivery: () => void;
}

// export interface Delivery {
//   name: string;
//   price: number;
//   time: number;
// }

export const DeliveryContext = createContext<DeliveryContextValue>({
  delivery: {
    name: "",
    price: 0,
    time: 0,
  },
  isLoading: false,
  fetchDelivery: () => {},
});

export const DeliveryProvider: React.FC<React.ReactNode> = ({children}) => {
  const [delivery, setDelivery] = React.useState<DeliveryInterface>();
  const [isLoading, setIsLoading] = useState(false);


  const getDelivery = async (delivery: Promise<DeliveryInterface> => {
    setIsLoading(true);

    return DeliveryFetch(delivery)
      .then((delivery) => {
        setDelivery(delivery);
        setIsLoading(false);

        // throw e;
      });

  return (
    <DeliveryContext.Provider value={{ delivery }}>
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryProvider;
export const useDelivery = () => useContext(DeliveryContext);
function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

