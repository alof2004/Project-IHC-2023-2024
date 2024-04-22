import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar";
import LoginBox from "./components/LoginBox";
import { AuthProvider, useAuth } from './components/AuthContext'; // Import useAuth hook
import NavBarClient from './components/NavBarClient';
import RoomDetails from './components/RoomDetails';

function App() {
  const { isLoggedIn } = useAuth(); // Get isLoggedIn state from AuthContext
  console.log(useAuth()); // Log the value returned by the useAuth hook to see if it's correct
  return (
    <Router>
      <AuthProvider>
        
        <div>
          {isLoggedIn ? <NavBarClient /> : <NavBar />} {/* Render NavBar if user is logged in */}
          <p>Is logged in? {isLoggedIn ? 'Yes' : 'No'}</p>
          <Routes>
            <Route path="/" element={<div>aaaa</div>} /> {/* Use element prop to render LoginBox */}
            <Route path="/login" element={<LoginBox />} /> {/* Use element prop to render LoginBox */}
            <Route path="/RoomDetails" element={<RoomDetails />} /> {/* Use element prop to render LoginBox */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
