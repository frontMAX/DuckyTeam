import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { OrderCard } from "../components/Cards/OrderCard";
import { useOrder, Order } from "../contexts/Order/orderContext";
import { useUser } from "../contexts/UserContext";

export default function OrderPage() {
  const { id } = useParams();
  const { orders, fetchOrder } = useOrder();
  const { user } = useUser();

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
        {!user?.isAdmin && 
      <Box sx={{textAlign:"center", padding:"2rem"}}>
        <Typography fontSize={30}>Woops. <br/> Unauthorized access, please return back.</Typography>
      </Box>
      }
      {!!user?.isAdmin && order && 
        <OrderCard order={order}/>
      }
    </Container>
  );
}