import React, { useState } from "react";
import { useTheme } from '@mui/material/styles'
import Dialog from "@mui/material/Dialog/Dialog"
import useMediaQuery from '@mui/material/useMediaQuery';
import EditService from "./EditService";


function EditModal({open}){
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
   <EditService></EditService>
    </Dialog>);
}
export default EditModal;