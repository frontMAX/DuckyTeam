import { useEffect } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box, Button, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import { useOrder } from "../../contexts/Order/orderContext";

function AdminOrdersPage() {
  const { orders, fetchOrders } = useOrder();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

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
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableBody sx={{ display: "flex", flexDirection: "column" }}>
                  {orders.map((order, i) => {
                    return (
                      <TableCell key={i}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography>{order.orderNumber}</Typography>
                          <Box sx={{}}>
                            <Link to={`/admin/orders/${order.id}`}>
                              View order
                            </Link>
                          </Box>
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

export default AdminOrdersPage;