import { Link } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

function SupportPage() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          bgcolor: "#c7f0e1",
          textAlign: "center",
          mt: 2,
          padding: 3,
          minHeight: "40vh",
        }}
      >
        <Typography gutterBottom variant="h4">
          Kundtjänst
        </Typography>
        <Typography gutterBottom variant="h6">
          Svaret på de vanligaste frågorna hittar du <Link to="/faq">här</Link>
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Om du inte hittar svaret på din fråga så är du välkommen att kontakta
          oss
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          Telefonsupport 0700-000000
        </Typography>
        <Typography gutterBottom variant="subtitle2">
          Vardagar 08:00-17:00
        </Typography>
        <Typography variant="subtitle1">Mailsupport random@mail.com</Typography>
      </Box>
    </Container>
  );
}

export default SupportPage;
