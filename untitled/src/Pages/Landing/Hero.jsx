import { Box, Button, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";
import { SliderData } from '../../Components/SliderData';
import { useState, useEffect } from 'react';
import Img from "../../Components/media/3.png";
import Img1 from "../../Components/media/20.png";
import Img2 from "../../Components/media/21.png";
import CustomButton from "./CustomButton";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import './1.css'

const Hero = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
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
  const images = [Img, Img1, Img2];

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#ac3b61 ",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  return (
    <Box sx={{ backgroundColor: "", minHeight: "80vh" }}>
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
            <Title variant="h1">
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
          <section className='slider'>
          <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
          <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
          {SliderData.map((slide, index) => {
            return (
              <div
                className={index === current ? 'slide active' : 'slide'}
                key={index}
              >
                {index === current && (
                  <img src={slide.image} alt='barber image' className='image' />
                )}
              </div>
            );
          })}
        </section>
        </CustomBox>

      </Container>
    
    </Box>
  );
};

export default Hero;
