import axios from "axios";
import { Address } from "cluster";
import React, { useCallback, useContext } from "react";
import { User } from "../../../../backend/resources/user/user.model";
import { Delivery } from "../DeliveryContetxt";
import { Product } from "../product/ProductContext";

interface OrderContextValue {
  orders: Order[];
  // getOrders: () => void;
  fetchOrders: () => void;
  fetchOrder: (id: string) => void;
  createOrder: (orderData: Order) => void;
}



export interface BaseOrder {
  // should be virtual product  !!!! IMPORTANT TO FIX
  products: Product[];
  // shipping adress
  shippingAdress: Address;

  // delivery method
  delivery: Delivery;
}
export interface Order extends BaseOrder {
  id: number;
  orderNumber: string;
  orderTotal: number;
  user: User;
}

export const OrderContext = React.createContext<OrderContextValue>({
  orders: [],
  // getOrders: () => { },
  fetchOrders: () => { },
  fetchOrder: (id: string) => { },
  createOrder: (orderData: Order) => { }
});

export const OrderProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [orders, setOrders] = React.useState<Order[]>([]);

  const fetchOrders = useCallback(() => {
    axios.get<Order[]>("/api/order").then((res) => {
      setOrders(res.data);
    });
  }, []);

  const createOrder = useCallback((orderData: Order) => {
    axios.post<Order>("/api/order", orderData).then((res) => {
      setOrders([...orders, res.data]);
    });
  }, []);

  //single order by id

  const fetchOrder = useCallback((id: string) => {
    axios.get<Order>(`/api/order/${id}`).then((res) => {
      setOrders([res.data]);
    });
  }, []);

  return (
    <OrderContext.Provider
      value={{ orders, fetchOrders, fetchOrder, createOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;

export const useOrder = () => useContext(OrderContext);
