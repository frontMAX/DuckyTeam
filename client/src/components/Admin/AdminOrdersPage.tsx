import { Box, Button, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";



function AdminOrdersPage() {
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
        
      </Box>
    </Container>
  );
}

export default AdminOrdersPage;