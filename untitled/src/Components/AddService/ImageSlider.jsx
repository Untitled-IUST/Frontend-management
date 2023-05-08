import style from "./App.module.css";
import AddModal from "./AddModal";
import DeleteModal from "../DeleteService/DeleteModal";
import EditModal from "../EditService/EditModal";
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
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./ImageSlider.css";


function ImageSlider({ slides }, props) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const handleTabChange = (event, newIndex) => {
    setCurrentTabIndex(newIndex);
    setCategoryIndex(newIndex);

    localStorage.setItem("categoryId", data.categories[newIndex].id);
  };

  const [ShowComponent, setShowComponent] = useState({
    add: false,
  });
  const btnhandler = (event) => {
    setShowComponent({
      ...ShowComponent,
      [event.target.name]: !ShowComponent[event.target.name],
    });
  };

  const [servicefront, setServicefront] = useState([]);
  const[data,setMydata]=useState('')

  let { id } = useParams();

  let hairarray = [];
  let nailarray = [];
  let makeuparray = [];
  let skinarray = [];
  let access_token = localStorage.getItem("acctoken");

  useEffect(()=> {
    axios.get('https://amirmohammadkomijani.pythonanywhere.com/barber/info/1/') 
      .then((response) => {
          setMydata(response.data)
          setServicefront(response.data.categories)
      }).catch(err=> console.log(err))
      },[])

  return (
    <div className="All_Slider">
      <div className="wholebarber">
        <div>
          <div />
          <div className="hairdressers">
            <Tabs value={currentTabIndex} onChange={handleTabChange} centered textColor="primary">
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
                        maxWidth: 250,
                        bgcolor: "#ffecee",
                        fontFamily: "Roboto",
                        color: "#120c1e",
                        borderRadius: 3,
                        margin: 2,

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
                <Button
                  variant="contained"
                  // color="success"

                  name="add"
                  onClick={btnhandler}
                  bgcolor="white"
                >
                Add Service
                </Button>
                <Button
                  variant="contained"
                  // color="success"

                  name="delete"
                  onClick={btnhandler}
                  bgcolor="white"
                >
                  Delete Service
                </Button>
                <Button
                  variant="contained"
                  // color="success"

                  name="edit"
                  onClick={btnhandler}
                  bgcolor="white"
                >
                  Edit Service
                </Button>
                
              </div>
            </div>
            {ShowComponent.add && <AddModal open={true} />}
            {ShowComponent.delete && <DeleteModal open={true} />}
            {ShowComponent.edit && <EditModal open={true} />}

          </div>
        </div>
      </div>
      </div>
  );
}

export default ImageSlider;
