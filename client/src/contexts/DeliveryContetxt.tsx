import { createContext, FC, useContext, useState } from "react";

import { DeliveryInterface } from "../InterFaces";

export interface ContextValue {
  delivery?: DeliveryInterface;
}

export const DeliveryContext = createContext<ContextValue>({
  delivery: {
    name: "",
    price: 0,
    time: 0,
  },
});

const DeliveryProvider: FC = (props) => {
  const [delivery, setDelivery] = useState<DeliveryInterface>();

  return (
    <DeliveryContext.Provider value={{ delivery }}>
      {props.children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryProvider;
export const useDelivery = () => useContext(DeliveryContext);
