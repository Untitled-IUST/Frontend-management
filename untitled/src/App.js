import { Routes , Route } from 'react-router-dom';
import LoginBarber from "./Pages/LoginSignUp/LoginBarber";
import SignUpBarber from "./Pages/LoginSignUp/SignUpBarber";
import OrderHistory from './Pages/OrderHistory/OrderHistory';
import SideBar from './Components/SideBar/SideBar';
import ImageSlider from "./Components/AddService/ImageSlider";
import Pricing from "./Components/PremiumPlans/Pricing";
import Carddetails from "./Components/PaymentCard/Carddetails"

function App() {
  
  return (
    <Routes>
      <Route path="/" Component={LoginBarber}/>
      <Route path="/SignUpBarber" Component={SignUpBarber} />
      <Route path="/OrderHistory" element={
        <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
          <SideBar/>
          <OrderHistory/>
        </div>
      }/>
      <Route path="/AddService" element={
        <div id="app" style={({ height: "100vh" }, { display: "flex" })}>
          <SideBar/>
          <ImageSlider/>
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
    </Routes>
  );
}

export default App;