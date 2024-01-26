import React from "react";
import { render } from "react-dom";

import App from "./App.js";
import Auth from "../components/auth.js";
import Navbar from '../components/navbar.js';

render(<Navbar/>, document.getElementById('navbar'))
render(<Auth />, document.getElementById('auth'))