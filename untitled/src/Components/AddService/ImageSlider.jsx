import style from "./App.module.css";
import AddModal from "./AddModal";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import "./ImageSlider.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const styleB = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  backgroundColor: "#edc7b7",
  p: 4,
  position: "absolute",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

function ImageSlider() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [categoryName, setCategoryName] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setCurrentTabIndex(newIndex);
    setCategoryIndex(data.categories[newIndex].id);

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

  const servicehandler = (id) => {
    axios({
      method: "delete",

      url:
        "https://amirmohammadkomijani.pythonanywhere.com/barber/categories/" +
        categoryIndex +
        "/service/" +
        id,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${access_token}`,
      },
    }).then((res) => {
      window.location.reload(false);
    });
  };

  function categorySubmit(event) {
    console.log(categoryName)
    axios({
      method: "post",
      url: "https://amirmohammadkomijani.pythonanywhere.com/barber/categories/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${access_token}`,
      },
      data: {
        category: categoryName,
      },
    })
      .then((res) => {
        // console.log(res);
        window.location.reload(false);
      })
      .catch((error) => {
        console.warn(error);
      });
    event.preventDefault();
  }

  const [servicefront, setServicefront] = useState([]);
  const [data, setMydata] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let access_token = localStorage.getItem("accessTokenBarber");

  useEffect(() => {
    axios
      .get("https://amirmohammadkomijani.pythonanywhere.com/barber/info/1/")
      .then((response) => {
        setMydata(response.data);
        setServicefront(response.data.categories);
        console.log(response.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="All_Slider">
      <div className="wholebarber">
        <div>
          <div />
          <div className="hairdressers">
            <Tabs
              value={currentTabIndex}
              onChange={handleTabChange}
              centered
              textColor="primary"
            >
              {servicefront.map((item, index) => (
                <Tab
                  key={item.category}
                  label={item.category}
                  style={{ color: "#ac3b61", fontWeight: "bold" }}
                />
              ))}
             
              <IconButton onClick={() => handleOpen()}>
                <AddCircleOutlineIcon style={{ color: "#ac3b61" }} />
              </IconButton>

              
            </Tabs>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={styleB}>
                  <h3>Add a New Category</h3>
                  <form onSubmit={categorySubmit}>
                    <input
                    class="inputbox"
                      onChange={(e) => setCategoryName(e.target.value)}
                      type="text"
                      placeholder="Category"
                      name="Category"
                    />
                    <br></br>
                    <br></br>
                    <Button
                      type="submit"
                      variant="outlined"
                      style={{ backgroundColor: "#ac3b61", color: "#eee2dc" }}
                    >
                      Add Category
                    </Button>
                  </form>
                </Box>
              </Modal>
            {servicefront.map((item, index) => (
              <div
                key={item.category}
                style={{ display: currentTabIndex === index ? "flex" : "none" }}
              >
                {item.categoryServices.map((x) => (
                  <Grid item xs={12} sm={6} md={4} key={x.service}>
                    <Card
                      sx={{
                        // maxWidth: 250,
                        // minWidth: 150,
                        width: 180,
                        height: 300,
                        bgcolor: "#edc7b7",
                        fontFamily: "Roboto",
                        color: "#120c1e",
                        borderRadius: 2,
                        margin: 2,
                      }}
                    >
                      <CardMedia
                        sx={{ height: 140 }}
                        image={
                          x.servicePic
                            ? x.servicePic
                            : "https://s2.uupload.ir/files/a9d966e052bdeb38027ca58ac3217845_z5j6.jpg"
                        }
                        title="Hair style"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {x.service}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {x.price}$
                        </Typography>
                        <IconButton
                          aria-label="delete"
                          onClick={() => servicehandler(x.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    rowGap: "20px",
                  }}
                >
                  <Button
                    variant="contained"
                    name="add"
                    onClick={btnhandler}
                    style={{
                      backgroundColor: "#edc7b7",
                      color: "#261B39",
                      fontSize: "100px",
                      width: "180px",
                      height: "300px",
                      marginLeft: "20px",
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className={style.mainContainer}>
            <div className={style.btnComponentController}></div>
            {ShowComponent.add && <AddModal open={true} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
