import axios, { Axios } from "axios";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';


let access_token = localStorage.getItem("acctoken");
const DeleteService = () => {
  const [inputValue, setInputValue] = useState({
    Service: "",
    category: "",
    price: "",
    ServicePic: "",
  });
  
  const [serviceId, setServiceId] = useState();
 
  function formSubmit(event) {

    axios({
      method: "post",
      url: "https://amirmohammadkomijani.pythonanywhere.com/barber/categories/2/service/",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${access_token}`
      },
      data: {
       
        Id: serviceId,
        servicePic: null,
      }
    })

      .then((res) => {
        console.log(res);
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
      className="DeleteService"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: "20px",
      }}
    >
      <h3>Delete Service</h3>
      <form onSubmit={formSubmit} >
       

        <input  onChange={(e) => setServiceId(e.target.value)} type="number" placeholder="Id" name="Id" />


    

          <Button type="submit" variant="outlined">Delete Service</Button>          
      </form>
    </div>
  );
};

export default DeleteService;