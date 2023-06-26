import { Routes , Route } from 'react-router-dom';
import LoginBarber from "./Pages/LoginSignUp/LoginBarber";
import SignUpBarber from "./Pages/LoginSignUp/SignUpBarber";
import OrderHistory from './Pages/OrderHistory/OrderHistory';
import SideBar from './Components/SideBar/SideBar';
import ImageSlider from "./Components/AddService/ImageSlider";
import CommentSection from './Pages/CommentSection/CommentSection';
import Pricing from "./Components/PremiumPlans/Pricing";
import Carddetails from "./Components/PaymentCard/Carddetails"
import {Receipt} from "./Components/Receipt/Receipt"
import SendEmail from './Pages/LoginSignUp/SendEmail';
import Landing from "./Pages/Landing/Landing";

function App() {
  
  return (
    <Routes>
      <Route path="/" Component={Landing}/>
      <Route path="/LoginBarber" Component={LoginBarber}/>
      <Route path="/SignUpBarber" Component={SignUpBarber} />
      <Route path="/OrderHistory" element={
        <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
          <SideBar />
          <OrderHistory/>
        </div>
      }/>
      <Route path="/AddService" element={
        <div id="app" style={({ display: "flex" })}>
          <SideBar/>
          <ImageSlider/>
        </div>
      }/>
      <Route path="/CommentSection" element={
        <div id="app" style={({ display: "flex" })}>
          <SideBar/>
          <CommentSection/>
        </div>
      }/>
      <Route path="/PremiumPlans" element={
        <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
          <SideBar/>
          <Pricing/>
        </div>
      }/>
      <Route path="/PaymentCard" element={
        <div id="app" style={({ height: "100vh" }, { display: "flex" })}>

          <Carddetails/>
        </div>
      }/>
      <Route path="/payment" Component={Receipt} />
      <Route path="/ForgotPassword" Component={SendEmail} />
    </Routes>
  );
}

export default App;