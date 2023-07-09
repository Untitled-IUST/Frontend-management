import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";

import fbIcon from "../../Components/media/fbicon.png";
import twitterIcon from "../../Components/media/twittericon.png";
import linkedinIcon from "../../Components/media/linkedinicon.png";
import './1.css'

const Footer = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    gap: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const IconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  }));

  const FooterLink = styled("span")(({ theme }) => ({
    fontSize: "16px",
    color: "#7A7A7E",
    fontWeight: "300",
    cursor: "pointer",
    "&:hover": {
      color: "#000",
    },
  }));

  return (
    <Box sx={{ py: 10 }}>
      <CustomContainer>
        <CustomContainer>
          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Products
            </Typography>

            <FooterLink>Listing</FooterLink>
            <br />
            <FooterLink>Properties</FooterLink>
            <br />
            <FooterLink>Agents</FooterLink>
            <br />
            <FooterLink>Blog</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Resources
            </Typography>

            <FooterLink>Makeup Salons</FooterLink>
            <br />
            <FooterLink>Barbershops</FooterLink>
            <br />
            <FooterLink>Online Reservation</FooterLink>
            <br />
            <FooterLink>Free Trial</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Company
            </Typography>

            <FooterLink>Partnerships</FooterLink>
            <br />
            <FooterLink>Terms of use</FooterLink>
            <br />
            <FooterLink>Privacy</FooterLink>
            <br />
            <FooterLink>Sitemap</FooterLink>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Get in touch
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                color: "#7A7A7E",
                fontWeight: "500",
                mb: 2,
              }}
            >
              You’ll find your happiness, in any style you prefer.
            </Typography>

            <IconBox>
            <a href="https://www.facebook.com/President.Mahmoud.Ahmadinejad/" target="_blank" rel="noopener noreferrer">
              <img src={fbIcon} alt="fbIcon" style={{ cursor: "pointer" }} />
              </a>
              <a href="https://twitter.com/Ahmadinejad1956">
              <img
                src={twitterIcon}
                alt="twitterIcon"
                style={{ cursor: "pointer" }}
              />
              </a>
              <a href="https://www.linkedin.com/in/maryam-behroozi-a50284201" target="_blank" rel="noopener noreferrer">
              <img
                src={linkedinIcon}
                alt="linkedinIcon"
                style={{ cursor: "pointer" }}
              />
              </a>
            </IconBox>
          </Box>
        </CustomContainer>
      </CustomContainer>
    </Box>
  );
};

export default Footer;
