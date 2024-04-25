import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar";
import LoginBox from "./components/LoginBox";
import { AuthProvider, useAuth } from './components/AuthContext'; // Import useAuth hook
import NavBarClient from './components/NavBarClient';
import RoomDetails from './components/RoomDetails';
import HomeClient from './components/homeClient';
import HomeLandlord from './components/homeLandlord';
import Home from './components/home';
import Login from './components/Login';
import SignupClient from './components/SignupClient';
import SignupLandlord from './components/SignupLandlord';


function App() {
  const { isLoggedIn } = useAuth(); // Get isLoggedIn state from AuthContext

  return (
    <Router>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/homeClient" element={<HomeClient />} />
            <Route path="/homeLandlord" element={<HomeLandlord />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup/client" element={<SignupClient />} />
            <Route path="/signup/landlord" element={<SignupLandlord />} />
            <Route path="/RoomDetails" element={<RoomDetails />} /> {/* Use element prop to render RoomDetails */}
            <Route path="/home" element={<Home/>} />
            <Route path="/rooms/:city" element={<Home/>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}


export default App;
