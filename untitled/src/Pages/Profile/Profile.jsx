import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import "./Profile.css"

export default function EditProfilePage() {



    const [logo, setLogo] = React.useState(null);
    const [background, setBackground] = React.useState(null);
  
    const handleLogoChange = (event) => {
      setLogo(URL.createObjectURL(event.target.files[0]));
    };
  
    const handleBackgroundChange = (event) => {
      setBackground(URL.createObjectURL(event.target.files[0]));
    };







  return (
    <div className='whole'>
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: "row",
        gap: '16px',
      }}
      noValidate
      autoComplete="off"
    />
      <Box sx={{display: "flex",position: "relative", flexDirection: "column", flexWrap: "wrap",marginTop:'10%', gap: "16px", backgroundColor:"#edc7b7 ",height:'60%' }}  >
      <Card sx={{ width: 200 }}>

        <CardMedia
          component="img"
          height="140"
          image={background}
          alt="Background"
        />
      </Card>
      <Avatar
        alt="Logo"
        src={logo}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1
        }}
      />
    <input type="file" accept="image/*" onChange={handleLogoChange} />
  <input type="file" accept="image/*" onChange={handleBackgroundChange} />

    </Box>
    <div>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridGap: "16px",
        marginBottom: '10%',
        justifyContent:'center',
        marginTop:'25%',
        backgroundColor:"#edc7b7 ",
        padding:'5%',
 
        
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="barber-shop-name" label="Barber Shop Name" variant="outlined" />
      <TextField id="owner" label="Owner" variant="outlined" />
      <TextField id="parvaneh" label="Parvaneh" variant="outlined" />
      <TextField id="phone-number" label="Phone Number" variant="outlined" />
      <TextField id="area" label="Area" variant="outlined" />
      <TextField id="address" label="Address" variant="outlined" />


    </Box>
    </div>
</div>
  );
}