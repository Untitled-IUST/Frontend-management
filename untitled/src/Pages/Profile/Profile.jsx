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
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function EditProfilePage() {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
    const [logoFile, setLogoFile] = useState(null);
    const [backgroundFile, setBackgroundFile] = useState(null);
    const areas = [
        'Tehranpars',
        'Nazi Abad',
        'Narmak',
        'Tajrish',
        'Gheytariye',
        'Marzdaran',
        'Janat Abad',
        'Vanak',
        'Enghelab',
        'Valiasr',
        'Saadat Abad',
        'Piroozi',
        'Jordan'
      ];
    const handleAreaChange = (e) => {
        setArea(e.target.value);
      }
    const handleLogoChange = (event) => {
        setLogo(URL.createObjectURL(event.target.files[0]));
        setLogoFile(event.target.files[0]); // Store the file object in state
      };
      
      const handleBackgroundChange = (event) => {
        setBackground(URL.createObjectURL(event.target.files[0]));
        setBackgroundFile(event.target.files[0]); // Store the file object in state
      };

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
    let access_token = localStorage.getItem("accessTokenBarber");
    const [barberShopName, setBarberShopName] = useState('');
    const [owner, setOwner] = useState('');
    const [parvaneh, setParvaneh] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [area, setArea] = useState('');
    const [address, setAddress] = useState('');
    const [logo, setLogo] = useState(null);
    const [background, setBackground] = useState(null);
    const[username,setUsername]= useState('');
    const[password,setPassword]= useState('');
    useEffect(() => {
        console.log(access_token);
        axios.get('https://amirmohammadkomijani.pythonanywhere.com/barber/profile/me/', {
          headers: {
            'Authorization': `JWT ${access_token}`,
            'Content-Type': 'application/json',
          }
        })
        .then((response) => {
         console.log('info',response.data)
          setBarberShopName(response.data.BarberShop);
          setOwner(response.data.Owner)
          setParvaneh(response.data.Parvaneh)
          setPhoneNumber(response.data.phone_Number)
          setArea(response.data.area)
          setAddress(response.data.address);
          setBackground(response.data.background)
          setLogo(response.data.logo)
          setUsername(response.data.user.username)
          setPassword(response.data.user.password)

        })
        .catch(err => console.log(err))
      }, [])
    function handleSubmit(event) {
        event.preventDefault();
        // Create a FormData object
        const formData = new FormData();

        formData.append('BarberShop', barberShopName);
        formData.append('Owner', owner);
        formData.append('Parvaneh', parvaneh);
        formData.append('phone_Number', phoneNumber);
        formData.append('area', area);
        formData.append('address', address);
        formData.append('user.username', username);
        formData.append('user.password', password);
        if (logoFile) {
          formData.append('logo', logoFile); // Append the file object instead of the URL string
        }
        if (backgroundFile) {
          formData.append('background', backgroundFile); // Append the file object instead of the URL string
        }
        // ...
      
    
        // Send the form data to your backend using axios
        axios.put('https://amirmohammadkomijani.pythonanywhere.com/barber/profile/me/', formData, {
            headers: {
                Authorization: `JWT ${access_token}`,
              },
        })
          .then(response => {
            console.log('didit dear',response.data);

          })
          .catch(error => {
            console.log(error)
          });
      }
      const [boxHeight, setBoxHeight] = useState('60%');

        useEffect(() => {
        if (parvanehError || phoneNumberError) {
            setBoxHeight('57%');
        } else {
            setBoxHeight('53%');
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
        '& > :not(style)': { m: 1 ,},
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridGap: "16px",
        marginBottom: '5%',
        justifyContent:'center',
        backgroundColor:"#edc7b7 ",
        padding:'5%',
        marginLeft:isLargeScreen ? '-2%' : '0%',
        width: isLargeScreen ? '750px' : '100%',
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
    <FormControl variant="outlined">
      <InputLabel id="area-label">Area</InputLabel>
      <Select
        labelId="area-label"
        id="area"
        value={area}
        onChange={handleAreaChange}
        label="Area"
      >
        {areas.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
      <TextField
        id="address"
        label="Address"
        variant="outlined"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
        <TextField
        id="username"
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
        id="password"
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        disabled={true}
        onChange={(e) => setPassword(e.target.value)}
        />


    </Box>
    {isLargeScreen && <Button type="submit" className='inipini1' sx={{ fontFamily:'Roboto, ',}}
    onClick={handleSubmit}>Update And Save</Button>}
    </div>

      <Box sx={{display: "flex",position: "relative", flexDirection: "column", 
      flexWrap: "wrap", gap: "16px", backgroundColor:"#edc7b7 ",
      height:boxHeight,borderRadius:"10px" ,marginBottom:isLargeScreen ?'-3%':'1.5%',
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
    { !(isLargeScreen) && <Button type="submit" className='inipini1' sx={{ fontFamily:'Roboto, ',}}
    onClick={handleSubmit}>Update And Save</Button>}

</div>
  );
}