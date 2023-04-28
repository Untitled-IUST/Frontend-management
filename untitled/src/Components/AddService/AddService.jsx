import axios, { Axios } from "axios";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import './AddService.css';

let access_token = localStorage.getItem("acctoken");
const AddService = () => {
  const [inputValue, setInputValue] = useState({
    Service: "",
    category: "",
    price: "",
    ServicePic: "",
  });

  //let formData = new FormData();
  function formSubmit(event) {
    let form_data = new FormData();
    if (inputValue.ServicePic)
      form_data.append(
        "ServicePic",
        inputValue.ServicePic,
        inputValue.ServicePic.name
      );
    form_data.append("Service", inputValue.Service);
    form_data.append("Price", inputValue.price);
    form_data.append("category", inputValue.category);

    axios
      .post(
        `https://amirmohammadkomijani.pythonanywhere.com/barber/categories/1/service/`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `JWT ${access_token}`,
          },
          data: {
            service: "inputValue.Service",
            price: 1000,
            servicePic: "",
          },
        }
        // console.log(access_token)
        // axios({
        //   method : "post",
        //   url : "https://amirmohammadkomijani.pythonanywhere.com/barber/categories/1/service/",
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `JWT ${access_token}`
        // },
        // data :
        // {
        //   "service": "Service",
        //   "price": "1000",
        //   "servicePic": "null" ,
        // }

        // }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.warn(error);
      });
    event.preventDefault();
  }
  const onInputChange = (event) => {
    switch (event.target.name) {
      case "Service":
        setInputValue({ ...inputValue, Service: event.target.value });
        // setService(event.target.value);
        //formData.append("Service" , event.target.value);

        break;

      case "category":
        setInputValue({ ...inputValue, category: event.target.value });

        console.log(inputValue);
        break;

      case "price":
        setInputValue({ ...inputValue, price: event.target.value });
        console.log(inputValue);
        break;

      case "file":
        setInputValue({ ...inputValue, ServicePic: event.target.files[0] });

      default:
        break;
    }
  };

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
      }}
    >
      <h3>Add a New Service</h3>
      <form onSubmit={formSubmit}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            id="outlined-required"
            label="Service Name"
            defaultValue=""
            color="warning"

          />

          <TextField
            id="outlined-number"
            label="Service Price"
            type="number"
            color="warning"
            InputLabelProps={{
              shrink: true,
              
            }}
          />
          {/* <input
          value={inputValue.Service}
          onChange={onInputChange}
          type="text"
          placeholder="Service"
          name="Service"
        />

        <input
          value={inputValue.category}
          onChange={onInputChange}
          type="text"
          placeholder="Category"
          name="category"
        />

        <input
          value={inputValue.price}
          onChange={onInputChange}
          type="number"
          placeholder="Price"
          name="price"
        /> */}
        <div className="form_buttom">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button variant="contained" component="label">
              Upload
              <input hidden accept="image/*" multiple type="file" />
            </Button>
            
          </Stack>
          {/* <input onChange={onInputChange} type="file" name="file" /> */}

          <Button type="submit" variant="outlined">Add Service</Button>
        </div>
          
        </Box>
      </form>
    </div>
  );
};

export default AddService;
