import { Order } from '@shared/types';

import axios from 'axios';
import React, { useCallback, useContext, useState } from 'react';

interface OrderContextValue {
    isLoading: boolean;
    orders: Order[];
    getOrders: () => void;
    fetchOrders: () => void;
    fetchOrder: (id: string) => void
}


// den är ju shared, men vet iinte hur jag får in.. 
// export interface Order {
//     id: number
// }

export const OrderContext = React.createContext<OrderContextValue>({
    isLoading: false,   // hur ska vi ha det här ?   osäker om behövs..
    orders: [],
    getOrders: () => { },
    fetchOrder: (id: string) => { },
    fetchOrders: () => { }

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

    const fetchOrders = useCallback(() => {
        axios.get<Order[]>("http://localhost:5001/api/order").then((res) => {
            setOrders(res.data);
        })
    }, [])


    //single order by id
    const fetchOrder = useCallback((id: string) => {
        axios.get<Order[]>(`http://localhost:5001/api/order/${id}`).then((res) => {
            setOrders(res.data)
        })
    }, [])

    return (
        <OrderContext.Provider value={{ orders, isLoading, getOrders, fetchOrders, fetchOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContext;

export const useOrder = () => useContext(OrderContext);