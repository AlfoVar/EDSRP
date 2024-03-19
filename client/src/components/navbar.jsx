import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    gesibar: {
      main: "#FD6574",
      light: "#6C8A9B",
      dark: "#E6E6E4",
      contrastText: "#F9F5EF",
    },
  },
});

const Navbar = () => {
  const { logout, isAuthenticated, errors: AuthErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{ bgcolor: "gesibar.main", marginBottom: "20px" }}
      >
        <Toolbar sx={{ margin: "0.5% 0.5%" }}>
          <Typography
            variant="h6"
            sx={{ marginRight: "auto", fontWeight: "bold" }}
          >
            EDS Rio Prado
          </Typography>
          {isAuthenticated ? (
            <ul className="flex gap-x-2 ">
            <li>
              <Button color="inherit">
                <Link to="/daily">Crear cierre</Link>
              </Button>
            </li>
            <li>
              <Button color="inherit">
                <Link to="/products">Productos</Link>
              </Button>
            </li>
            <li>
              <Button color="inherit">
                <Link to="/listdailys">Cierres</Link>
              </Button>
            </li>
          </ul>
          ) : null}
          {isAuthenticated ? (
            <Button color="inherit">
              <Link to="/register">Registro de usuarios</Link>
            </Button>
          ) : (
            <Button color="inherit">
              <Link to="/login">Login</Link>
            </Button>
          )}
          {isAuthenticated ? (
            <Button color="inherit">
              <Link onClick={() => logout()}>Salir</Link>
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
