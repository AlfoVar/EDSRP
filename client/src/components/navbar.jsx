import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    gesibar:{
      main: '#FD6574',
      light: '#6C8A9B',
      dark: '#E6E6E4',
      contrastText: '#F9F5EF',
    },
  },
});

const Navbar = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{bgcolor: "gesibar.main", marginBottom:"20px"}}>
        <Toolbar sx={{ margin: "0.5% 0.5%" }}>
          <Typography variant="h6" sx={{ marginRight: "auto", fontWeight: "bold" }} >
            EDS Rio Prado
          </Typography>
          <ul className="flex gap-x-2 ">
            <li>
              <Button color="inherit">
                <Link to="/daily">Cierre</Link>
              </Button>
            </li>
            <li>
              <Button color="inherit">
                <Link to="/products">Productos</Link>
              </Button>
            </li>
          </ul>
          <Button color="inherit">
            <Link to="/login">Login</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
