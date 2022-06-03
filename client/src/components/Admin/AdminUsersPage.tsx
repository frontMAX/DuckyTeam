import {
  Box,
  Button,
  Container,
  Divider,
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
import EditIcon from "@mui/icons-material/Edit";
import { useUser } from "../../contexts/UserContext";

function AdminUsersPage() {
  const { users, fetchUsers } = useUser();

  const [addingProduct, setAddingProduct] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Container sx={{ height: "100%", minWidth: 360, maxWidth: 900 }}>
      <Link to="/admin">
        <Button sx={{ paddingTop: "2rem" }} startIcon={<ArrowBackIcon />}>
          Tillbaka till adminsidan
        </Button>
      </Link>
      <Box
        sx={{
          height: "100%",
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <Typography padding={2} sx={{ fontWeight: "bold" }}>
                List of all users by email
              </Typography>
              <Divider />
              <TableRow>
                <TableBody
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {users.map((user, i) => {
                    return (
                      <TableCell key={i}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography>{user.email}</Typography>
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

export default AdminUsersPage;
