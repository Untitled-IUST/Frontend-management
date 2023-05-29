import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import StorefrontIcon from '@mui/icons-material/Storefront';
import axios from "axios";
import {Link} from 'react-router-dom';

function SideBar(){
  
  const { collapseSidebar } = useProSidebar();
  // const [userName, setUserName] = useState("");
  let access_token =localStorage.getItem('accessTokenBarber');

  // useEffect(() => {
  //   // console.log(access_token);
  //   axios.get('https://amirmohammadkomijani.pythonanywhere.com/customer/profile/me/',{
  //     headers:{
  //       "Content-Type": 'application/json',
  //       Authorization: `JWT ${access_token}`
  //     }
  //   }).then((res)=>{
  //     console.log(access_token);
  //     setUserName(res.data.first_name);
  //   }).catch((err)=>{
  //     // console.log(err)
  //   })},[])

    return (
        <Sidebar backgroundColor="#EEE2DC">
          <Menu rootStyles={{color: "#AC3B61"}} >
            <MenuItem icon={<MenuOutlinedIcon />} onClick={() => { collapseSidebar(); }} style={{ textAlign: "center" }} >
              {" "}
              {/* <h2 className="text-xl">{userName}</h2> */}
            </MenuItem>
            <MenuItem icon={<StorefrontIcon/>} component={<Link to="/AddService" />}>Manage Services</MenuItem>
            <MenuItem icon={<ManageHistoryIcon/>} component={<Link to="/OrderHistory" />}>Orders History</MenuItem>
            <MenuItem icon={<LogoutIcon />} onClick={() => {localStorage.removeItem('accessTokenBarber')}} component={<Link to="/" />}>Log Out</MenuItem>
          </Menu>
        </Sidebar>
    )

}
export default SideBar;