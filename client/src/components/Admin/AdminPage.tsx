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
    <Container sx={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <Link to="/">
        <Button sx={{ paddingTop: "2rem" }} startIcon={<ArrowBackIcon />}>
          Tillbaka till startsidan
        </Button>
      </Link>
      <Box
        sx={{
          textAlign: "center",
          marginTop: "5rem",
          padding: "2rem",
          width: "50vw",
          bgcolor: "background.paper",
        }}
      >
        <h1>Välkommen till adminsidan. </h1>
        <p>Navigera till önskad sida:</p>
        <nav aria-label="main mailbox folders">
          <List>
            <Link to="products">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    sx={{ textAlign: "center", color: "black" }}
                    primary="VISA / HANTERA PRODUKTER"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
            <Link to="orders">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    sx={{ textAlign: "center", color: "black" }}
                    primary="VISA/ HANTERA ORDRAR"
                  />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
            <Link to="users">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    sx={{ textAlign: "center", color: "black" }}
                    primary="VISA / HANTERA ANVÄNDARE"
                  />
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
