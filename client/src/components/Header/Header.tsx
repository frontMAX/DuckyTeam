import { Box, Tabs, Tab, Container, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import { useUser } from "../../contexts/UserContext";
import CartButton from "./CartButton";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

function Header() {
  const TabValues: string[] = ["/", "/products", "/about"];

  const filteredValue = (value: string) =>
    TabValues.includes(value) ? value : false;

  const navigate = useNavigate();

  const [value, setValue] = useState(filteredValue(useLocation().pathname));

  const currentLocation = filteredValue(useLocation().pathname);
  if (currentLocation !== value) {
    setValue(currentLocation);
  }
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  const { user, logoutUser } = useUser();

  return (
    <>
      <Container maxWidth="md" sx={{ padding: "0,2rem", mb: 1, mt: 2 }}>
        <Box sx={{ width: "100%" }}>
          {!!user && (
            <Typography fontWeight={700}>
              Du är nu inloggad som: {user?.email}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box  sx={{
            display: "flex",
            gap: "0.8rem",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}>
            <Link to="/">
              {" "}
              <HomeIcon
                sx={{ color: "black", fontSize: "2rem", ml: "0.5rem" }}
              />{" "}
            </Link>
            <Link to="/products">
              {" "}
              <Typography sx={{ color: "black" }}>PRODUKTER</Typography>{" "}
            </Link>
            {!!user?.isAdmin && (
              <Link to="/admin">
                <AdminPanelSettingsIcon
                  sx={{ color: "black", ml: "1rem", fontSize: "2rem" }}
                />
              </Link>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: ".1rem",
              "@media screen and (max-width: 700px)": {
                marginRight: "-10px",
              },
            }}
          >
            {!user ? (
              <Link to="/login">
                <Button
                  sx={{
                    bgcolor: "white",
                    border: "none",
                    color: " black",
                    minWidth: "1px",
                    "&:hover": {
                      bgcolor: "#dadcd9",
                      border: "none",
                      color: " black",
                    },
                    "@media screen and (max-width: 480px)": {
                      fontSize: "0",
                      padding: "0",
                      bgcolor: "transparent",
                      textalign: "none",
                      "&:hover": {
                        bgcolor: "transparent",
                      },
                    },
                  }}
                  variant="outlined"
                  endIcon={
                    <AccountCircleIcon
                      sx={{
                        padding: "1rem",
                        height: "2rem",
                        width: "2rem",
                        "@media screen and (max-width: 440px)": {
                          marginRight: "-30px",
                  
                        },
                      }}
                      color="warning"
                    />
                  }
                >
                  Logga in
                </Button>
              </Link>
            ) : (
              <Button
                sx={{
                  bgcolor: "white",
                  border: "none",
                  color: " black",
                  minWidth: "1px",
                  "&:hover": {
                    bgcolor: "#dadcd9",
                    border: "none",
                    color: " black",
                  },
                  "@media screen and (max-width: 480px)": {
                    fontSize: "0",
                    padding: "0",
                    bgcolor: "transparent",
                    textalign: "none",
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  },
                }}
                variant="outlined"
                endIcon={
                  <AccountCircleIcon
                    sx={{
                      padding: "1rem",
                      height: "2rem",
                      width: "2rem",
                      "@media screen and (max-width: 440px)": {
                        marginRight: "-30px",
                      },
                    }}
                    color="success"
                  />
                }
                onClick={() => logoutUser()}
              >
                Logga ut
              </Button>
            )}

            <CartButton />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Header;
