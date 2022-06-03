import { Box, Container, Divider } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { OrderCard } from "../components/Cards/OrderCard";
import { useOrder, Order } from "../contexts/Order/orderContext";

function ConfirmedOrderPage() {
  const { id } = useParams();
  const { orders, fetchOrder } = useOrder();

  const order = orders.find((item: Order) => item.id.toString() === id);

  useEffect(() => {
    if (id) {
      fetchOrder(id);
    }
  }, [fetchOrder, id]);

  return (
    <Container maxWidth="md">
      <Box sx={{ bgcolor: "#ffffff", padding: 2 }}>
        <h2>Tack för din beställning!</h2>
        <p>
          Din betalning och beställning har genomförts, och snart kommer dina
          nya ankor till sitt nya hem! <br />
          Nedan är en sammanfattning på din beställning;
        </p>
        <Divider />
        {order && <OrderCard order={order} />}
      </Box>
    </Container>
  );
}

export default ConfirmedOrderPage;
