import { createContext, FC, useContext, useState } from "react";
import { Delivery } from "../InterFaces";

export interface ContextValue {
  delivery?: Delivery;
}

export const DeliveryContext = createContext<ContextValue>({
  delivery: {
    name: "",
    price: 0,
    time: 0,
  },
});

const DeliveryProvider: FC = (props) => {
  const [delivery, setDelivery] = useState<Delivery>();

  return (
    <DeliveryContext.Provider value={{ delivery }}>
      {props.children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryProvider;
export const useDelivery = () => useContext(DeliveryContext);
