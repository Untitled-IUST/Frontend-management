import style from "./App.module.css";
import AddModal from "./AddModal";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
// import "../css/ImageSlider.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

function ImageSlider({ slides }, props) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const handleTabChange = (event, newIndex) => {
    setCurrentTabIndex(newIndex);
  };
  const [ShowComponent, setShowComponent] = useState({
    add: false,
    delete: false,
  });
  const btnhandler = (event) => {
    setShowComponent({
      ...ShowComponent,
      [event.target.name]: !ShowComponent[event.target.name],
    });
  };

  const [servicefront, setServicefront] = useState([]);

  let { id } = useParams();

  let hairarray = [];
  let nailarray = [];
  let makeuparray = [];
  let skinarray = [];

  useEffect(() => {
    axios
      .get("https://amirmohammadkomijani.pythonanywhere.com/barber/info/1/")
      .then((response) => {
        setServicefront(response.data.categories);
        for (let i = 0; i < servicefront.length; i++) {
          if (servicefront[i].category == "skin") {
            skinarray.push.apply(skinarray, servicefront[i].categoryServices);
          }
          if (servicefront[i].category == "hair") {
            hairarray.push.apply(hairarray, servicefront[i].categoryServices);
          }
          if (servicefront[i].category == "makeup") {
            makeuparray.push.apply(
              makeuparray,
              servicefront[i].categoryServices
            );
          }
          if (servicefront[i].category == "nail") {
            nailarray.push.apply(nailarray, servicefront[i].categoryServices);
          }
        }
      })
      .catch((err) => console.log(err));

    //Axios config
    axios.defaults.baseUrl = "";
    axios.interceptors.request.use((request) => {
      console.log(request);
      return request;
    });
    axios.interceptors.response.use((response) => {
      console.log(response);
      return response.data;
    });
  }, []);
  // useEffect(() => {
  //   console.log(servicefront);
  // }, [servicefront]);

  return (
    <>
      <div className="wholebarber">
        <div>
          <div />
          <div>
            <Tabs value={currentTabIndex} onChange={handleTabChange} centered>
              {servicefront.map((item, index) => (
                <Tab key={item.category} label={item.category} />
              ))}
            </Tabs>
            {servicefront.map((item, index) => (
              <div
                key={item.category}
                style={{ display: currentTabIndex === index ? "flex" : "none" }}
              >
                {item.categoryServices.map((x) => (
                  <Grid item xs={12} sm={6} md={4} key={x.service}>
                    <Card
                      sx={{
                        maxWidth: 345,
                        bgcolor: "#ffecee",
                        fontFamily: "Roboto",
                        color: "#120c1e",
                        borderRadius: 3,
                      }}
                    >
                      <CardMedia
                        sx={{ height: 140 }}
                        image="https://s2.uupload.ir/files/a9d966e052bdeb38027ca58ac3217845_z5j6.jpg"
                        title="Hair style"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {x.service}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {x.price}$
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={style.mainContainer}>
        <div className={style.btnComponentController}>
          <div
            style={{
              display: "flex",
              marginLeft: "480PX",
              alignItems: "center",
              rowGap: "20px",
            }}
          >
            <button name="add" onClick={btnhandler}>
              add Services
            </button>
          </div>
        </div>
        {ShowComponent.add && <AddModal open={true} />}
      </div>
    </>
  );
}

export default ImageSlider;
