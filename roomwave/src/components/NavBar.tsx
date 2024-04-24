import '../App.css'; // Adjust the path as necessary
import '../css/NavBar.css'; // Adjust the path as necessary
import { Link } from 'react-router-dom'; // Assuming you're using React Router

function NavBar() {
  return (
    <nav className="navbar border-bottom navbar-expand-lg myCustomNavbar" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/RoomDetails" className="navbar-brand">
          <img src="../src/images/roomWaveLogo.png" width="95" height="50" alt="Logo"/>
        </Link>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <div className="container1">
              <input type="text" placeholder="Procurar quartos em..." />
              <div className="search"></div>
            </div>
            <li className="nav-item nav-item-flex">
              <Link to="login" className="nav-link">
                <img src="../src/images/perfil_icon.png" width="30" height="30" alt="Profile Icon"/>
                Log-In
              </Link>
            </li>
            <li className="nav-item nav-item-flex">
              <img src="../src/images/ajuda_icon.png" width="25" height="25" alt="Help Icon"/>
              <a className="nav-link" href="#">Ajuda</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
