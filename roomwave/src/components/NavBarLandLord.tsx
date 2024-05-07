import '../App.css'; // Adjust the path as necessary
import { Link } from 'react-router-dom'; // Assuming you're using React Router

function NavBarLandLord() {
  return (
    <nav className="navbar border-bottom navbar-expand-lg myCustomNavbar" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <a className="navbar-brand" href="#">
            <img src="./src/images/roomWaveLogo.png" width="95" height="50" alt="Logo"/>
          </a>
        </Link>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item nav-item-flex">
              <Link to="../addRoom" className="nav-link">
                <img src="./src/images/heart.png" width="30" height="30" alt="Home Icon"/>
                AddRoom
              </Link>
            </li>
            <li className="nav-item nav-item-flex">
              <Link to="perfil" className="nav-link">
                <img src="./src/images/perfil_icon.png" width="30" height="30" alt="Profile Icon"/>
                Perfil
              </Link>
            </li>
            <li className="nav-item nav-item-flex">
                <Link to="../../../Ajuda" className="nav-link">
                <img src="../src/images/ajuda_icon.png" width="25" height="25" alt="Help Icon" />
                Ajuda
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBarLandLord;