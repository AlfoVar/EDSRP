import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar className="bg-zinc-700 flex justify-between py-5 px-10 rounded-lg" position="static">
      <Toolbar>
        <Typography variant="h6" className="text-2xl font-bold">EDS Rio Prado</Typography>
        <ul className="flex gap-x-2">
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
  );
};

export default Navbar;
