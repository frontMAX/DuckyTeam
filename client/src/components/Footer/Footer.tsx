import { Box } from "@mui/material";
import LinksContainer from "./LinksContainer";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#eaa0ff",
        width: "100%",
        height: "fit-content",
        marginTop: "2rem",
      }}
    >
      <LinksContainer />
    </Box>
  );
}

export default Footer;
