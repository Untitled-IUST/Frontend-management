import axios, { Axios } from "axios";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import "./AddService.css";

let access_token = localStorage.getItem("accessTokenBarber");
const AddService = () => {
  const [inputValue, setInputValue] = useState({
    Service: "",
    category: "",
    price: "",
    ServicePic: "",
  });
  const [serviceName, setServiceName] = useState();
  const [servicePrice, setServicePrice] = useState();
  const [servicePic, setServicePic] = useState();

  function formSubmit(event) {
    var categoryId = localStorage.getItem("categoryId");
    axios({
      method: "post",

      url:
        "https://amirmohammadkomijani.pythonanywhere.com/barber/categories/" +
        categoryId +
        "/service/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${access_token}`,
      },
      data: {
        service: serviceName,
        price: servicePrice,
        servicePic: null,
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

  const postData = (event) => {
    event.preventDefault();
    console.log(inputValue);

    axios
      .post(`/Products`, inputValue)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div
      className="All_AddService"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: "20px",
        flexWrap: "wrap", // added flex-wrap property
      }}
    >
      <h3>Add a New Service</h3>
      <form onSubmit={formSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            class="inputbox"
            onChange={(e) => setServiceName(e.target.value)}
            type="text"
            placeholder="Service"
            name="Service"
          />
          <br />
          <input
            class="inputbox"
            onChange={(e) => setServicePrice(e.target.value)}
            type="number"
            placeholder="Price"
            name="price"
          />
          <br />
          <input
            onChange={(e) => setServicePic(e.target.files[0])}
            type="file"
            name="servicePicture"
          />
          <br />
          <Button
            type="submit"
            variant="outlined"
            style={{ backgroundColor: "#ac3b61", color: "#eee2dc" }}
          >
            Add Service
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
