import React, { useState, useEffect } from "react";
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
import axios from "axios";
import "./Pricing.css";
import { useNavigate } from 'react-router-dom';


const tiers = [
  {
    title: "1 MONTH",
    Month: "1-month",
    price: "5",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "BUY",
    buttonVariant: "contained",
  },
  {
    title: "3 MONTHS",
    Month: "3-month",
    subheader: "Most popular",
    price: "15",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "BUY",
    buttonVariant: "contained",
  },
  {
    title: "6 MONTHS",
    Month: "6-month",
    price: "25",
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonText: "BUY",
    buttonVariant: "contained",
  },
];



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Pricing() {
  const [premiumId, setPremiumId] = useState();
  const navigate = useNavigate(); 
  let access_token = localStorage.getItem("accessTokenBarber");
  
  useEffect(() => {
    axios
        .get(
          "https://amirmohammadkomijani.pythonanywhere.com/barber/premium/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${access_token}`,
            },
          }
        )
        .then((res) => {
          // console.log(res.data[0].id);
          setPremiumId(res.data[0].id);
          console.log('got it honey', premiumId)
          console.log(res.data)
         
          
        })
        .catch((err) => {
          console.log(err)

        }); console.log(access_token)

  }, []);

  

  
  return (
    
    <ThemeProvider theme={defaultTheme}>
      <div className="AllPremium">
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none", } }}
      />
      <CssBaseline />

      <Container maxWidth="md" component="main" className="middleContainer">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    sx={{ backgroundColor: "#ac3b61", '&:hover': {
                        backgroundColor: '#eee2dc',
                        color: '#000000',
                      },}}
                      onClick={() => BuyPremium(tier.price, tier.Month)}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>

    </ThemeProvider>
  );
  function BuyPremium(price, month){
    console.log(price + ' ' + month + ' ' +premiumId)
      axios({
        method: "put",
        url: "https://amirmohammadkomijani.pythonanywhere.com/barber/buypremium/"+premiumId+"/",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${access_token}`,
        },
        data: {
          Month: month,
        },
      })
        .then((res) => {
          console.log(res);
          navigate(`/paymentcard?value=${price}`);
        })
        .catch((error) => {
          console.warn(error);
        });

      
  }
}
export default Pricing;
