import React from 'react';

import {useState} from "react";
import axios from "axios";
import style from "./App.module.css";
import AddModal from "./AddModal";

//Axios config
axios.defaults.baseUrl = "";
axios.interceptors.request.use((request)=>{
  console.log(request);
  return request;
});
axios.interceptors.response.use((response)=>{
  console.log(response);
  return response.data;
});

const Add = () => {
  const[ShowComponent , setShowComponent] = useState({
    
    add: false,
    delete: false,
  });
  const btnhandler =(event) =>{
    setShowComponent({...ShowComponent, [event.target.name]: !ShowComponent[event.target.name],
    });
  };
  return (
    <div className = {style.mainContainer}>
      <div className = { style.btnComponentController}>
        <div 
        style={{
          display: "flex",
          marginLeft : "480PX",
          alignItems : "center",
          rowGap : "20px"

        }}>
  
          <button name = "add" onClick = {btnhandler}>
            add Services
          </button>

          
        </div>
      </div>
      
      {ShowComponent.add && <AddModal open={true}/>}
    </div>
  );
};

export default Add;

