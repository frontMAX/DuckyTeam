import React, {
  useCallback,
  useContext,
} from "react";
import axios from "axios";

interface DeliveryContextValue {
  deliveries: Delivery[];
  fetchDeliveries: () => void;
  fetchDelivery: (id: string) => void;
}

export interface Delivery {
  _id: string;
  name: string;
  altText: string;
  shippingTime: number;
  price: number;
  logoUrl?: string;
}

export const DeliveryContext = React.createContext<DeliveryContextValue>({
  deliveries: [],
  fetchDelivery: (id: string) => {},
  fetchDeliveries: () => {},
});

export const DeliveryProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [deliveries, setDeliveries] = React.useState<Delivery[]>([]);

  const fetchDeliveries = useCallback(() => {
    axios.get<Delivery[]>("/api/delivery").then((res) => {
      setDeliveries(res.data);
    });
  }, []);

  const fetchDelivery = useCallback((id: string) => {
    axios.get<Delivery>(`/api/delivery/${id}`).then((res) => {
      setDeliveries([res.data]);
    });
  }, []);

  return (
    <DeliveryContext.Provider
      value={{
        deliveries,
        fetchDeliveries,
        fetchDelivery
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryContext;

export const useDelivery = () => useContext(DeliveryContext);
