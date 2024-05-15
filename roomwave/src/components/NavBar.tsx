import '../App.css'; // Adjust the path as necessary
import '../css/NavBar.css'; // Adjust the path as necessary
import { Link, useLocation } from 'react-router-dom'; // Assuming you're using React Router
import { useUser } from "./UserContext"; // Assuming you have a UserContext
import NavBarClient from './NavBarClient';

function NavBar() {
  const { user } = useUser();
  const location = useLocation();
  console.log(user);

  if (localStorage.getItem("userData") === null) {
    return (
      <nav className="navbar border-bottom navbar-expand-lg myCustomNavbar" data-bs-theme="dark">
        <div className="container-fluid">
          <Link to="/Home" className="navbar-brand">
          <img src="../src/images/roomWaveLogo.png" width="148" height="80" alt="Logo" />
          </Link>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item nav-item-flex">
                <Link to="/login" className="nav-link">
                  <img src="../src/images/perfil_icon.png" width="50" height="50" alt="Profile Icon"/>
                  Log-In
                </Link>
              </li>
              <li className="nav-item nav-item-flex">
                <Link to="/Ajuda" className="nav-link">
                  <img src="../src/images/ajuda_icon.png" width="50" height="50" alt="Help Icon"/>Ajuda
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <NavBarClient/>
    );
  }
}

export default NavBar;
