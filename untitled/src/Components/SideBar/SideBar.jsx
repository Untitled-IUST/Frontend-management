import { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import StorefrontIcon from "@mui/icons-material/Storefront";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CommentIcon from '@mui/icons-material/Comment';
import axios from "axios";

import { Link } from "react-router-dom";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import RadialSeparators from "./RadialSeparators";


function SideBar() {
  const { collapseSidebar } = useProSidebar();
  const [userName, setUserName] = useState("Fargol");
  const [expireDate, setExpireDate] = useState();
  const [days, setDays] = useState();
  const [month, setMonth] = useState();

  let access_token = localStorage.getItem("accessTokenBarber");

  useEffect(() => {
    // console.log(access_token);
    axios
      .get(
        "https://amirmohammadkomijani.pythonanywhere.com/customer/profile/me/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${access_token}`,
          },
        }
      )
      .then((res) => {
        setUserName(res.data.first_name);
      })
      .catch((err) => {
        // console.log(err)
      });

      axios
      .get(
        "https://amirmohammadkomijani.pythonanywhere.com/barber/premium/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${access_token}`,
          },
        }
      )
      .then((res) => {
        setExpireDate(res.data[0].expire_date);
        setMonth(res.data[0].month);
        setDays(res.data[0].days);

      })
      .catch((err) => {
        // console.log(err)
      });

  }, []);

  return (
    <Sidebar backgroundColor="#edc7b7 " >
      <Menu rootStyles={{ color: "#123c69" }}>
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: "center" }}
        >
          {" "}
          <h2>{userName}</h2>
        </MenuItem>
        <MenuItem
          icon={<StorefrontIcon />}
          component={<Link to="/AddService" />}
        >
          Manage Services
        </MenuItem>
        <MenuItem
          icon={<ManageHistoryIcon />}
          component={<Link to="/OrderHistory" />}
        >
          Orders History
        </MenuItem>
        <MenuItem
          icon={<WorkspacePremiumIcon />}
          component={<Link to="/PremiumPlans" />}
        >
          Premium Plans
        </MenuItem>
        <MenuItem
          icon={<CommentIcon />}
          component={<Link to="/CommentSection" />}
        >
          Comment Section
        </MenuItem>
        <MenuItem
          icon={<StorefrontIcon />}
          component={<Link to="/Profile" />}
        >
          Profile
        </MenuItem>
        <MenuItem
          icon={<LogoutIcon />}
          onClick={() => {
            localStorage.removeItem("accessTokenBarber");
          }}
          component={<Link to="/" />}
        >
          Log Out
        </MenuItem>
      </Menu>

      <div
        
        style={{
          width: 120,
          height: 120,
          marginTop:50,
          marginLeft:60,
        }}
      >
        <CircularProgressbarWithChildren
          value={(days/(month*31))*100}
          text={`${days}days`}
          strokeWidth={10}
          styles={buildStyles({
            strokeLinecap: "butt",
            pathColor: "#123c69",
            textColor: "#123c69",
          })}
        >
          <RadialSeparators
            count={12}
            style={{
              background: "#edc7b7",
              width: "1px",
              height: `${10}%`,
            }}
          />
        </CircularProgressbarWithChildren>
      
        
      </div>
      <p style={{
          marginLeft:30,
          color: "#123c69",
          fontWeight: "bold",
        }}>Expire Date {expireDate}</p>
    </Sidebar>
  );
}
export default SideBar;
