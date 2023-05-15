import { Routes , Route } from 'react-router-dom';
import LoginBarber from "./Pages/LoginSignUp/LoginBarber";
import SignUpBarber from "./Pages/LoginSignUp/SignUpBarber";
import OrderHistory from './Pages/OrderHistory/OrderHistory';
import AddService from './Components/AddService/AddService';
import SideBar from './Components/SideBar/SideBar';

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
          <AddService/>
        </div>
      }/>
    </Routes>
  );
}

export default App;