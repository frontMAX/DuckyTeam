import axios from "axios";
import { Address } from "cluster";
import React, { useCallback, useContext } from "react";
import { User } from "../../../../backend/resources/user/user.model";
import { OrderData } from "../../components/Forms/OrderForm";
import { ShippingAdress } from "../../components/Forms/ShippingForm";
import { Delivery } from "../DeliveryContetxt";
import { OrderProduct, Product } from "../product/ProductContext";
import { CartType } from "../Reducers";

export interface NewOrderData {
  shipping: ShippingAdress;
  // customer: User,
  orderTotal: number;
  delivery: string;
  products: CartType[];
}

interface OrderContextValue {
  orders: Order[];
  // getOrders: () => void;
  fetchOrders: () => void;
  fetchOrder: (id: string) => void;
  createOrder: (newOrderData: NewOrderData) => Promise<Order>;
}

export interface Order {
  // should be virtual product  !!!! IMPORTANT TO FIX
  products: OrderProduct[];

  // shipping adress
  shipping: ShippingAdress;
  // delivery method
  delivery: Delivery;
  createdAt: Date;
  id: number;
  orderNumber: string;
  orderTotal: number;
  user: User;
}

export const OrderContext = React.createContext<OrderContextValue>({
  orders: [],
  // getOrders: () => { },
  fetchOrders: () => {},
  fetchOrder: (id: string) => {},
  createOrder: (newOrderData: NewOrderData) => {
    return Promise.resolve({} as Order);
  },
});

export const OrderProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [orders, setOrders] = React.useState<Order[]>([]);

  const fetchOrders = useCallback(() => {
    axios.get<Order[]>("/api/order").then((res) => {
      setOrders(res.data);
    });
  }, []);

  const createOrder = useCallback(
    async (newOrderData: NewOrderData): Promise<Order> => {
      const result = await axios.post<Order>("/api/order", newOrderData);
      setOrders([...orders, result.data]);

      return result.data;
    },
    []
  );

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
