import axios from "axios";
import React, { useState } from "react";
import Button from "@mui/material/Button";

let access_token = localStorage.getItem("accessTokenBarber");

const AddService = () => {
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [servicePic, setServicePic] = useState(null);

  function formSubmit(event) {
    event.preventDefault();

    var categoryId = localStorage.getItem("categoryId");
    var form = new FormData();
    form.append("service", serviceName);
    form.append("price", servicePrice);
    form.append("servicePic", servicePic);

    axios({
      method: "post",
      url:
        "https://amirmohammadkomijani.pythonanywhere.com/barber/categories/" +
        categoryId +
        "/service/",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${access_token}`,
      },
      data: form,
    })
      .then((res) => {
        // console.log(res);
        window.location.reload(false);
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  return (
    <div>
      <h3>Add a New Service</h3>
      <form onSubmit={formSubmit}>
        <div>
          <input
            className="inputbox"
            onChange={(e) => setServiceName(e.target.value)}
            type="text"
            placeholder="Service"
            name="Service"
          />
          <br />
          <input
            className="inputbox"
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
