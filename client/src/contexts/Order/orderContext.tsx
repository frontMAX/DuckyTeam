import { Order } from '@shared/types';
import axios from 'axios';
import React, { useContext, useState } from 'react';

interface OrderContextValue {
    isLoading: boolean;
    orders: Order[];
    getOrders: () => void;
}

export const OrderContext = React.createContext<OrderContextValue>({
    isLoading: false,   // hur ska vi ha det här ? 
    orders: [],
    getOrders: () => { }
});

export const OrderProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false); // Behövs denna ? 

    const getOrders = async () => {
        setIsLoading(true);
        const response = await axios.get<Order[]>('/api/product');
        setOrders(response.data);
        setIsLoading(false);
    };

    return (
        <OrderContext.Provider value={{ orders, isLoading, getOrders }}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContext;

export const useOrder = () => useContext(OrderContext);