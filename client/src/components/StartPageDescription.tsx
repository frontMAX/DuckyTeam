import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import PopularDucks from "./Cards/PopularDucks";

function StartPageDesription() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "fitContent",
        background: "#ffffff",
        paddingTop: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "@media screen and (max-width: 480px)": {
            flexDirection: "column",
          },
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            padding: "1rem",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
          }}
        >
          Välkommen till Random-Shop - affären där vi säljer vad vi vill!
        </Typography>
      </Box>
      <Box
        sx={{
          width: "70%",
          textAlign: "center",
          margin: "auto",
          padding: "2rem",
        }}
      >
        <Typography sx={{ fontSize: "clamp(1rem, 2.5vw, 1.1rem)" }}>
          Håll humöret flytande med hjälp av.. lite vad som helst!
          Bara fantasin kan sätta gränserna för vad du kan hitta här!
          Njut av tillvaron, och kolla in vårat ologiska sortiment!
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{ marginBottom: "2rem", fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
        >
          Se våra produkter
        </Typography>
        <PopularDucks />
        <Link to="products">
          <Button
            sx={{
              mt: 2,
              mb: 2,
              height: "3rem",
              bgcolor: "#0EDFE6",
              border: "none",
              color: " black",
              "&:hover": {
                bgcolor: "#eaa0ff",
                border: "none",
                color: "black",
              },
            }}
            variant="outlined"
          >
            Visa alla produkter
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default StartPageDesription;
