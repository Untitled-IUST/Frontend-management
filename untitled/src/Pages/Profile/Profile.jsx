import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import "./Profile.css"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';

export default function EditProfilePage() {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    

    const handleLogoChange = (event) => {
      setLogo(URL.createObjectURL(event.target.files[0]));
    };
  
    const handleBackgroundChange = (event) => {
      setBackground(URL.createObjectURL(event.target.files[0]));
    };
    const CustomTextField = styled(TextField)({
        '& label.Mui-focused': {
          color: '#123c69',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#123c69',
        },
      })
      const [parvanehError, setParvanehError] = useState(false);
      const [phoneNumberError, setPhoneNumberError] = useState(false);
      
      const handleParvanehChange = (e) => {
        setParvaneh(e.target.value);
        if (e.target.value.length !== 10) {
          setParvanehError(true);
        } else {
          setParvanehError(false);
        }
      };
      
      const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
        if (e.target.value.length !== 11) {
          setPhoneNumberError(true);
        } else {
          setPhoneNumberError(false);
        }
      };
    const [barberShopName, setBarberShopName] = useState('');
    const [owner, setOwner] = useState('');
    const [parvaneh, setParvaneh] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [area, setArea] = useState('');
    const [address, setAddress] = useState('');
    const [logo, setLogo] = useState(null);
    const [background, setBackground] = useState(null);
    function handleSubmit(event) {
        event.preventDefault();
    
        // Create a FormData object
        const formData = new FormData();
        formData.append('barberShopName', barberShopName);
        formData.append('owner', owner);
        formData.append('parvaneh', parvaneh);
        formData.append('phoneNumber', phoneNumber);
        formData.append('area', area);
        formData.append('address', address);
        if (logo) {
          formData.append('logo', logo);
        }
        if (background) {
          formData.append('background', background);
        }
    
        // Send the form data to your backend using axios
        axios.post('/your-backend-url', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            // Handle the response
          })
          .catch(error => {
            // Handle the error
          });
      }
      const [boxHeight, setBoxHeight] = useState('50%');

        useEffect(() => {
        if (parvanehError || phoneNumberError) {
            setBoxHeight('54%');
        } else {
            setBoxHeight('50%');
        }
        }, [parvanehError, phoneNumberError]);
    



  return (
    <div className='whole'>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: "row",
        gap: '16px',

      }}
      noValidate
      autoComplete="off"
    />

<div>
   <Typography  className='typo' sx={{color:'#123c69',fontFamily:'Roboto, ',}}> Geneal Information</Typography>
    <Box
      component="form"
      sx={{
        flex: "1.25", 
        '& > :not(style)': { m: 1 },
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridGap: "16px",
        marginBottom: '5%',
        justifyContent:'center',
        backgroundColor:"#edc7b7 ",
        padding:'5%',
        borderRadius:"10px",
        justifyItems:'center',
        fontFamily:'Roboto, ',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.7)'
 
        
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="barber-shop-name"
        label="Barber Shop Name"
        variant="outlined"
        value={barberShopName}
        onChange={(e) => setBarberShopName(e.target.value)}
      />
      <TextField
        id="owner"
        label="Owner"
        variant="outlined"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
    <TextField
    id="parvaneh"
    label="Parvaneh"
    variant="outlined"
    value={parvaneh}
    onChange={handleParvanehChange}
    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
    error={parvanehError}
    helperText={parvanehError ? 'Parvaneh Is incorrect' : ''}
    />
    <TextField
    id="phone-number"
    label="Phone Number"
    variant="outlined"
    value={phoneNumber}
    onChange={handlePhoneNumberChange}
    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
    error={phoneNumberError}
    helperText={phoneNumberError ? 'Phone Number Is incorrect' : ''}
    />
      <TextField
        id="area"
        label="Area"
        variant="outlined"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />
      <TextField
        id="address"
        label="Address"
        variant="outlined"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />


    </Box>
    {isLargeScreen && <Button type="submit" className='inipini1' sx={{ fontFamily:'Roboto, ',}}>Submit</Button>}
    </div>

      <Box sx={{display: "flex",position: "relative", flexDirection: "column", 
      flexWrap: "wrap", gap: "16px", backgroundColor:"#edc7b7 ",
      height:boxHeight,borderRadius:"10px" ,marginBottom:'3.5%',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.7)'
   
      }}  >
      <Card sx={{ width: isSmallScreen ? '265px' : 200 }}>
      <Avatar
        alt="Logo"
        src={logo}
        sx={{
          position: "absolute",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          width: 85, 
          height: 85 
        }}
      />
        <CardMedia
          component="img"
          image={background}
          alt="Background"
          sx={{
            width: isSmallScreen ? '100%' : '310px',
            objectPosition: '25% 53%',
            height: '120px',
            marginBottom: '5%',
            backgroundColor:'#edc7b7'
          }}
        />


        
      </Card>
      <Typography sx={{color:"#123c69", display:'flex', justifyContent:'center'}}>
      {barberShopName}
      </Typography>
      <label htmlFor="logo-upload" className="custom-file-upload" >
          <i className="fa fa-cloud-upload"></i> 
          <CloudUploadIcon /> Upload Logo
        </label>
        <input
          id="logo-upload"
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          style={{ display: "none" }}
        />

        <label htmlFor="background-upload" className="custom-file-upload">
          <i className="fa fa-cloud-upload"></i> <CloudUploadIcon />Upload Background
        </label>
        <input
          id="background-upload"
          type="file"
          accept="image/*"
          onChange={handleBackgroundChange}
          style={{ display: "none" }}
        />
     

    </Box>
    { !(isLargeScreen) && <Button type="submit" className='inipini1' sx={{ fontFamily:'Roboto, ',}}>Submit</Button>}

</div>
  );
}