import {
  Box,
  Button,
  Container,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProduct } from "../../contexts/product/ProductContext";
import { Add } from "@mui/icons-material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

interface AdminProductProps {
  expanded?: boolean;
}

function AdminProductsPage({ expanded }: AdminProductProps) {
  const { products, fetchProducts, deleteProduct } = useProduct();

  const [addingProduct, setAddingProduct] = useState(false);

  const [open, setOpen] = useState(expanded ?? false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = (
    event: React.SyntheticEvent<Element, Event>,
    expanded: boolean
  ) => setOpen(!open);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container sx={{ height: "100%", minWidth: 360, maxWidth: 900 }}>
      <Link to="/admin">
        <Button startIcon={<ArrowBackIcon />}>Tillbaka till adminsidan</Button>
      </Link>
      <Box
        sx={{
          height: "100%",
        }}
      >
        <Link to="/admin/products/new">
          <Button startIcon={<Add />}>Add new product</Button>
        </Link>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableBody sx={{ display: "flex", flexDirection: "column" }}>
                  {products.map((product, i) => {
                    return (
                      <TableCell key={i}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography>{product.name}</Typography>
                          <Box sx={{}}>
                            <Link to={`/admin/products/${product._id}`}>
                              <Button startIcon={<EditIcon />}>
                                Edit product
                              </Button>
                            </Link>
                          </Box>
                          <Button
                            startIcon={<DeleteForeverIcon />}
                            onClick={() => setOpenModal(true)}
                          >
                            Ta bort produkt
                          </Button>
                          <Modal
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            aria-labelledby="modal-modal-name"
                            aria-describedby="modal-modal-description"
                          >
                            <Box
                              sx={{
                                background: "white",
                                height: "10rem",
                                width: "25rem",
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                              }}
                            >
                              <Typography>
                                Är du säker på att du vill ta bort produkten?
                              </Typography>
                              {typeof product._id !== "undefined" && (
                                <Button
                                  onClick={(e) => {
                                    deleteProduct(product._id);
                                    setOpenModal(false);
                                    setOpen(false);
                                    e.stopPropagation();
                                  }}
                                >
                                  Ja
                                </Button>
                              )}
                              <Button onClick={() => setOpenModal(false)}>Nej</Button>
                            </Box>
                          </Modal>
                        </Box>
                      </TableCell>
                    );
                  })}
                </TableBody>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default AdminProductsPage;