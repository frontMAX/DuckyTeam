import { Box, Button, Container, List } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Product, useProduct } from "../../contexts/product/ProductContext";
import EditProductCard from "./EditProductCard"
import { Add } from "@mui/icons-material";

function AdminProductsPage() {
  const { products, fetchProducts } =
    useProduct();
  const [addingProduct, setAddingProduct] = useState(false);

    
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  


  return (
    <Container maxWidth="xl" sx={{ height: "100%" }}>
      <Link to="/admin">
        <Button startIcon={<ArrowBackIcon />}>Tillbaka till adminsidan</Button>
      </Link>
      <Box
        sx={{
          height: "100%",
        }}
      >
        <Link to="/admin/products/new">
        <Button startIcon={<Add/>}>Add new product</Button>
      </Link>
        <List>
          {products.map((p, i) => {
            return (
              <EditProductCard
                key={i}
                product={p}
              />
            );
          })}
        </List>
        {!addingProduct && (
          <Button
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={() => setAddingProduct(true)}
          >
            Lägg till ny produkt
          </Button>
        )}
      </Box>
    </Container>
  );
}

export default AdminProductsPage;
