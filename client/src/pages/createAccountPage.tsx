import { Box, Container, Typography } from "@mui/material";
import CreateAccountForm from "../components/Forms/createAccountForm";

function createAccountPage() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          alignSelf: "center",
          margin: "auto",
          bgcolor: "#ffffff",
          mt: 2,
          textAlign: "center",
          padding: 2,
          minHeight: "10vh",
          width: "300px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          SKAPA KONTO
        </Typography>

        {/* Log in form with username and password */}
        <CreateAccountForm />

        {/* just for development, remove before "real" launch. */}
        <Box>
          <Typography
            variant="body1"
            sx={{ mt: 5, fontWeight: "bold" }}
          ></Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default createAccountPage;
