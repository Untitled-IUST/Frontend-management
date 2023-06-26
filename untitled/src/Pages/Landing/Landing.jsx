import * as React from "react";
import "./Landing.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

const Landing = () => {
  const navigate = useNavigate();
  const [landingState, setLandingState] = useState("");
  
  // TODO remove, this demo shouldn't need to reset the theme.
  const defaultTheme = createTheme();

  // useEffect(() => {
  //     getLanding(1).then (m => {
  //       setLandingState(m.data)
  //       console.log(m.data);
  //     }).catch()
  //     console.log (landingState)
  //   },[])

  return (
    <div className="landingAll">
      <div className="landingNav">
        <button className="nameButton" onClick={() => navigate("/")}>
          UNTITLED
        </button>
        <button className="navLogin" onClick={() => navigate("/LoginBarber")}>
          Login/Register
        </button>
      </div>
      <div className="landingTitleHolder">
        <p className="landingTitle">Touch & Care</p>
        <p className="landingQuotes">Everything has beauty, but not everyone sees it.</p>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        

        <button className="landingButton" onClick={() => navigate("/LoginBarber")}>
          LOGIN NOW !
        </button>
      </div>
      <div className="landingFooter">
        <div className="landingPhoneNumber">
          <p className="landingPhoneTitle">Phone number</p>
          <p className="landingPhoneDetail">{landingState.phonenumber}</p>
        </div>
        <div className="landingAddress">
          <p className="landingPhoneTitle">Company address</p>
          <p className="landingPhoneDetail">{landingState.address}</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;