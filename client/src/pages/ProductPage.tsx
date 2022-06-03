import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams } from "react-router-dom";
import BuyButton from "../components/BuyButton";
import { useCart } from "../contexts/CartContext";
import { Product, useProduct } from "../contexts/product/ProductContext";
import { useEffect } from "react";

function ProductPage() {
  let { id } = useParams();
  const { cart, dispatch } = useCart();
  const { products, fetchProduct } = useProduct();
  const product = products.find((item: Product) => item._id.toString() === id);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [fetchProduct]);

  return (
    <Container maxWidth="md">
      <Link to="/products">
        <Button startIcon={<ArrowBackIcon />}>
          Tillbaka till produktsidan
        </Button>
      </Link>
      {product && (
        <Card sx={{ height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ["@media (min-width:480px)"]: {
                flexDirection: "row"
              },
            }}
          >
            <CardMedia
              component="img"
              height="480"
              image={`http://localhost:5001${product.imageUrl}`}
              sx={{ objectFit: "contain", maxWidth: "20rem" }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                alignItems: "center",
              }}
            >
              <CardContent sx={{ maxWidth: "100%" }}>
                <Typography variant="h5" component="div" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.details}
                </Typography>
              </CardContent>
              <CardActions>
                {cart.some((p: any) => p.id === product._id) ? (
                  <Button>I kundkorgen</Button>
                ) : (
                  <BuyButton dispatch={dispatch} product={product} />
                )}
              </CardActions>
            </Box>
          </Box>
        </Card>
      )}
    </Container>
  );
}

export default ProductPage;
