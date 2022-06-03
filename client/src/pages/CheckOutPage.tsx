import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import OrderForm from "../components/Forms/OrderForm";
import useLocalStorage from "../Hooks/useLocalStorage";
import { CartType } from "../contexts/Reducers";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDelivery } from "../contexts/DeliveryContetxt";
import { useUser } from "../contexts/UserContext";
import CreateAccountForm from "../components/Forms/CreateAccountForm";

function CheckOutPage() {
  const { user, createUser } = useUser();
  const [cart] = useLocalStorage<CartType[]>("cart", "");
  const [total] = useLocalStorage<number>("cartSum", 0);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<
    string | undefined
  >(undefined);

  const { deliveries, fetchDeliveries } = useDelivery();

  const getShippingPrice = (selectedDeliveryId?: string) => {
    const selectedDelivery = deliveries.find((delivery) => {
      return delivery._id === selectedDeliveryId;
    });
    if (selectedDelivery) {
      return selectedDelivery?.price;
    }
    return 0;
  };

  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  let navigate = useNavigate();

  return (
    <Container maxWidth="md">
      {/* cart summary, loops throught cart array */}
      <Box sx={{ bgcolor: "#ffffff", mt: 2 }}>
        <Typography
          variant="h5"
          sx={{ mt: -2, mb: 2, fontWeight: "bold", padding: "2rem" }}
        >
          Din varukorg
        </Typography>
        <List dense>
          {cart?.length &&
            cart.map((c: CartType) => (
              <ListItem key={c._id}>
                <ListItemAvatar>
                  <img
                    src={c.imageUrl}
                    alt={c.name}
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      marginRight: "2vw",
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={c.name}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "block" }}
                        component="span"
                        variant="body2"
                      >
                        Antal: {c.qty} st
                      </Typography>
                      <Typography
                        sx={{ display: "block" }}
                        component="span"
                        variant="body2"
                      >
                        {" "}
                        Pris: {c.price} kr/st
                      </Typography>
                    </>
                  }
                />
                <ListItemText
                  primary={`${c.qty * c.price} kr`}
                  sx={{ textAlign: "right" }}
                />
              </ListItem>
            ))}
        </List>
      </Box>
      <Divider sx={{ mt: 2, mb: 2 }} />
      {/* get and print total price of products */}
      <Box sx={{ textAlign: "right" }}>
        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
          Pris för produkter (inkl 25% moms)
        </Typography>
        <Typography variant="body2">{`${total} kr`}</Typography>
      </Box>

      <Box sx={{ textAlign: "right" }}>
        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
          Totalpris (inkl moms & frakt)
        </Typography>
        <Typography variant="body2">
          {`${total + getShippingPrice(selectedDeliveryId)}`} kr
        </Typography>
        <Button
          variant="outlined"
          onClick={toCart}
          sx={{
            mt: 2,
            bgcolor: "white",
            border: "1",
            borderColor: "white",
            color: " black",
            "&:hover": {
              bgcolor: "#dfdfdf",
              border: "1",
              borderColor: "#dfdfdf",
              color: "black",
            },
            "@media screen and (max-width: 440px)": {
              display: "none",
            },
          }}
        >
          Tillbaka till kundvagnen
        </Button>
      </Box>

      {/* the full form with adress, payment and shipping */}
      <Divider sx={{ mt: 2, mb: 2 }} />
      {!user ? (
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center"}}>
          <Typography fontSize={20} mb={2}>
            För att slutföra din beställning behöver du ett konto.
          </Typography>
          <Link to="/login">
            <Button>Har du redan ett konto?  Logga in</Button>
          </Link>
          <CreateAccountForm />
        </Box>
      ) : (
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center"}}>

        <OrderForm
          setSelectedDeliveryId={setSelectedDeliveryId}
          selectedDeliveryId={selectedDeliveryId}
        />
        </Box>
      )}
    </Container>
  );

  function toCart() {
    navigate("/cartPage");
  }
}

export default CheckOutPage;
