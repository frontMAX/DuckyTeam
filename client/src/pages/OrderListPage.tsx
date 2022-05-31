import { useEffect } from "react";
import { OrderCard } from "../components/order/orderCard";
import { useOrder } from "../contexts/Order/orderContext";
import { Grid } from "@mui/material";

function OrderListPage() {
  const { orders, fetchOrders } = useOrder();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <Grid container spacing={2}>
      {orders.map((order) => (
        <OrderCard key={order.id} />
      ))}
    </Grid>
  );
}

export default OrderListPage;
