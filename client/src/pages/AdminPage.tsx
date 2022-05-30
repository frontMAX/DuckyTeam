import { Box, Button, Container, List } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link } from "react-router-dom";
import AdminPageAccordion from "../components/AdminPageAccordion";
import { useEffect, useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useProduct, Product } from "../contexts/product/ProductContext";

function AdminPage() {
  const { products, fetchProducts, createProduct, updateProduct, deleteProduct } =
    useProduct();
  const [addingProduct, setAddingProduct] = useState(false);

    
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  const newProduct = () => {
    const id = '';

    const product: Product = {
      name: "",
      details: "",
      _id: id,
      category: [],
      price: 0,
      quantity: 0,
      imageUrl: "",
    };

    return product;
  };

  
  const createNewProduct = (product: Product) => {
    setAddingProduct(false);
    createProduct();
  };

  const deleteNewProduct = () => setAddingProduct(false);

  return (
    <Container maxWidth="xl" sx={{ height: "100%" }}>
      <Link to="/">
        <Button startIcon={<ArrowBackIcon />}>Tillbaka till startsidan</Button>
      </Link>
      <Box
        sx={{
          height: "100%",
        }}
      >
        <List>
          {products.map((p, i) => {
            return (
              <AdminPageAccordion
                key={i}
                product={p}
                saveAction={updateProduct}
                deleteAction={deleteProduct}
              />
            );
          })}
          {addingProduct && (
            <AdminPageAccordion
              key="new"
              expanded={true}
              product={newProduct()}
              saveAction={createNewProduct}
              deleteAction={deleteNewProduct}
            />
          )}
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

export default AdminPage;
