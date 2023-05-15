import React, { useState } from "react";
import { useTheme } from '@mui/material/styles'
import AddService  from "./AddService";
import Dialog from "@mui/material/Dialog/Dialog"
import useMediaQuery from '@mui/material/useMediaQuery';
import "./App.module.css"

function AddModal({open}){
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const[open1,setOpen1]=useState(true);
    function handleClose(){
        console.log("closed");
        setOpen1(false);
    }

    
    
    return(
    <Dialog
  open={open1}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  fullScreen={fullScreen}
>
    <AddService></AddService>
</Dialog>);
}
export default AddModal;