import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { Button, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function UserPage() {
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          textAlign: "center",
          marginTop: "2rem",
          padding: "5rem",
          width: "50vw",
          bgcolor: "background.paper",
        }}
      >
        <h1>Användarsida</h1>
        <p>Navigera till önskad sida:</p>
        <nav aria-label="main mailbox folders">
          <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
          <Link to="orders">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText
                  sx={{ textAlign: "center", color: "black" }}
                  primary="VISA / HANTERA DINA ORDRAR"
                />
              </ListItemButton>
            </ListItem>
          </Link>
        </nav>
      </Box>
    </Container>
  );
}

export default UserPage;
