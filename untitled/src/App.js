import { Routes , Route } from 'react-router-dom';

// import Blank from './Components/Blank';
// import ImageSlider from './Components/AddService/ImageSlider';



import LoginBarber from "./Pages/LoginSignUp/LoginBarber";
import SignUpBarber from "./Pages/LoginSignUp/SignUpBarber";

function App() {
  
  return (
    <Routes>
      <Route path="/" Component={LoginBarber}/>
      <Route path="/SignUpBarber" Component={SignUpBarber} />
      <Route path="/OrderHistory" />
      <Route path="/AddService" />
    </Routes>
  );
}

export default App;