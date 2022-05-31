import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios, { AxiosResponse } from "axios";

interface DeliveryContextValue {
  isLoading: boolean;
  deliveries: Delivery[];
  fetchDeliveries: () => void;
  fetchDelivery: (id: string) => void;
  createDelivery: () => void;
  updateDelivery: (delivery: Delivery) => void;
  deleteDelivery: (id: string) => void;
}

export interface Delivery {
  _id: string;
  name: string;
  altText: string;
  shippingTime: number;
  price: number;
  logo: string;
  id: string;
}

export const DeliveryContext = React.createContext<DeliveryContextValue>({
  isLoading: false,
  deliveries: [],
  fetchDelivery: (id: string) => {},
  fetchDeliveries: () => {},
  createDelivery: () => {},
  updateDelivery: (delivery: Delivery) => {},
  deleteDelivery: (id: string) => {},
});

export const DeliveryProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [deliveries, setDeliveries] = React.useState<Delivery[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const createDelivery = useCallback(() => {
    axios.post<Delivery>("http://localhost:5001/api/delivery").then((res) => {
      setDeliveries([...deliveries, res.data]);
    });
  }, []);

  const updateDelivery = useCallback((newDeliveryData: Delivery) => {
    axios
      .put<Delivery>(
        `http://localhost:5001/api/deliveries/${newDeliveryData._id}`,
        {
          newDeliveryData,
        }
      )
      .then((res) => {
        const deliveryIndex = deliveries.findIndex((delivery: Delivery) => {
          return (delivery._id = newDeliveryData._id);
        });
        deliveries[deliveryIndex] = res.data;
        setDeliveries(deliveries);
      });
  }, []);

  const deleteDelivery = useCallback((id: string) => {
    axios
      .delete<Delivery>(`http://localhost:5001/api/delivery/${id}`)
      .then((res) => {
        const deliveryIndex = deliveries.findIndex((delivery: Delivery) => {
          return (delivery._id = id);
        });
        setDeliveries([...deliveries.splice(deliveryIndex, 1)]);
      });
  }, []);

  return (
    <DeliveryContext.Provider
      value={{
        deliveries,
        isLoading,
        fetchDeliveries,
        fetchDelivery,
        createDelivery,
        updateDelivery,
        deleteDelivery,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryContext;

export const useOrder = () => useContext(DeliveryContext);
