import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { Button, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


function AdminPage() {
  return (
    <Container sx={{ display: "flex", justifyContent:"center" }}>
        <Link to="/">
        <Button startIcon={<ArrowBackIcon />}>Tillbaka till startsidan</Button>
      </Link>
      <Box sx={{ textAlign:"center", marginTop:"2rem", padding:"5rem", width: "50vw", bgcolor: "background.paper" }}>
        <h1>Welcome to the admin page. </h1>
        <p>Please choose which page you wish to navigate to:</p>
        <nav aria-label="main mailbox folders">
          <List>
            <Link to="products">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText sx={{ textAlign:"center", color:"black"}} primary="VIEW / MANAGE PRODUCTS" />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider sx={{marginTop:"1rem", marginBottom:"1rem"}}/>
            <Link to="orders">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText sx={{ textAlign:"center", color:"black"}} primary="VIEW / MANAGE ORDERS" />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </nav>
      </Box>
    </Container>
  );
}

export default AdminPage;
