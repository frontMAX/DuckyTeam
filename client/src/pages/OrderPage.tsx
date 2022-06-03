import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { OrderCard } from "../components/Cards/OrderCard";
import { useOrder, Order } from "../contexts/Order/orderContext";

export default function OrderPage() {
  const { id } = useParams();
  const { orders, fetchOrder } = useOrder();

  const order = orders.find((item: Order) => item.id.toString() === id);

  useEffect(() => {
    if (id) {
      fetchOrder(id);
    }
  }, [fetchOrder, id]);

  return (
    <Container>
      <Link to="/admin">
        <Button startIcon={<ArrowBackIcon />}>Tillbaka till adminsidan</Button>
      </Link>
      {order && (
        <OrderCard order={order}/>
      )}
    </Container>
  );
}