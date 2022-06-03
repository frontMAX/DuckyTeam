import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Order } from "../../contexts/Order/orderContext";

interface OrderCardProps{
order: Order
}

export function OrderCard({order}: OrderCardProps) {
  return (
    <Card sx={{ borderRadius: "1rem", padding: "1rem" }}>
      <Typography>Order number: {order.orderNumber}</Typography>
      <Divider sx={{ mb: "1rem" }} />
      <Typography>Order date: {order.createdAt}</Typography>
      <Divider sx={{ mb: "1rem" }} />
      <Typography>Delivery method: {order.delivery.name}</Typography>
      <Divider sx={{ mb: "1rem" }} />
      {/* <Typography>
                        Customer:  <Link to={`/user/${id}`}>{order.user}</Link>
                    </Typography> */}
      <Divider sx={{ mb: "1rem" }} />
      <TableContainer sx={{ minWidth: 650 }} aria-label="simple table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "700" }}>Product</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "700" }}>Qty</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.products.map((product) => {
              return (
                <TableRow key={product.imageUrl}>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.price}kr/st
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.qty}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <img
                      style={{ width: "80px" }}
                      src={`http://localhost:5001${product.imageUrl}`}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell colSpan={4} align="right">
                Total price incl shipping: {order.orderTotal} kr
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          gap: "0.5rem",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>Shipping adress</Typography>
        <Typography>
          {order.shipping.firstName} {order.shipping.lastName}
        </Typography>
        <Typography>{order.shipping.streetAdress}</Typography>
        <Typography>
          {order.shipping.postCode} {order.shipping.city}
        </Typography>
        <Typography>
          {order.shipping.phoneNumber} {order.shipping.emailAdress}
        </Typography>
      </Box>
    </Card>
  );
}
