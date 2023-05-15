import { Routes , Route } from 'react-router-dom';
import LoginBarber from "./Pages/LoginSignUp/LoginBarber";
import SignUpBarber from "./Pages/LoginSignUp/SignUpBarber";
import OrderHistory from './Pages/OrderHistory/OrderHistory';

function App() {
  
  return (
    <Routes>
      <Route path="/" Component={LoginBarber}/>
      <Route path="/SignUpBarber" Component={SignUpBarber} />
      <Route path="/OrderHistory" Component={OrderHistory}/>
      <Route path="/AddService" />
    </Routes>
  );
}

export default App;