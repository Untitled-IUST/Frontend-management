import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";

import heroImg from "../../Components/media/3.png";
import CustomButton from "./CustomButton";
import './1.css'

const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#ac3b61 ",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ backgroundColor: "#edc7b7 ", minHeight: "80vh" }}>
      <Container>
        <Navbar />
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#ac3b61 ",
                fontWeight: "500",
                mt: 10,
                mb: 4,       
                 fontFamily:'Roboto, ',
              }}
            >
              Welcome to Tuch And Care
            </Typography>
            <Title variant="h1" className="moving-title">
            Beauty is art, and makeup is the brush.
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 , fontFamily:'Roboto, ',}}
            >An online reservation system for a salon or beauty establishment allows clients to
             conveniently book their appointments online, saving time and effort. Thanks for TUCH AND CARE
            </Typography>
            <CustomButton
              backgroundColor="#ac3b61 "
              color="#fff"
              buttonText="More About Us"
              heroBtn={true}
            />
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <img
              src={heroImg}
              alt="heroImg"
              style={{ maxWidth: "100%", marginBottom: "5rem", marginLeft:"3rem", borderRadius:"10px" }}
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
