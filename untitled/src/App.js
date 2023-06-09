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
import EditProfilePage from './Pages/Profile/Profile';
import Hero from './Pages/Landing/Hero';
import Footer from "./Pages/Landing/Footer";
import { SliderData } from './Components/SliderData';
function App() {
  
  return (
    <Routes>

        <Route path="/" element={
        <div id="app" style={({ backgroundColor:"#eee2dc"})}>
          <Hero slides={SliderData}/>
          <Footer />
        </div>
      }/>
      <Route path="/LoginBarber" Component={LoginBarber}/>
      <Route path="/SignUpBarber" Component={SignUpBarber} />
      <Route path="/Profile" element={
        <div id="app" style={({ display: "flex" })}>
          <SideBar/>
          <EditProfilePage/>
        </div>
      }/>
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