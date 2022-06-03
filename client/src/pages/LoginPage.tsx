import { Box, Container, Typography } from "@mui/material";
import LoginForm from "../components/Forms/LoginForm";

function LoginPage() {
  return (
    <Container maxWidth="md" >
      <Box sx={{ bgcolor: "#ffffff", mt: 2, textAlign:"center", padding:2, minHeight:"50vh"}}>
        <Typography variant="h5" sx={{fontWeight: "bold", mb:3 }}>
          Logga in
        </Typography>
        <LoginForm />
      </Box>
    </Container>
  );
}

export default LoginPage;
