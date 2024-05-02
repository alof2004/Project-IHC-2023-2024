import '../App.css'; // Adjust the path as necessary
import { Link } from 'react-router-dom'; // Assuming you're using React Router

function NavBarClient() {
  return (
    <nav className="navbar border-bottom navbar-expand-lg myCustomNavbar" data-bs-theme="dark">
      <div className="container-fluid">
      <Link to="/HomeClient" className="navbar-brand">
          <img src="../src/images/roomWaveLogo.png" width="95" height="50" alt="Logo"/>
        </Link>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item nav-item-flex">
              <Link to="../../../favorites" className="nav-link">
                <img src="../../src/images/heart.png" width="30" height="30" alt="Home Icon"/>
                Favorites
              </Link>
            </li>
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{paddingLeft:"2px"}} href='#'>
            <img src="../../src/images/perfil_icon.png" width="30" height="30" alt="Profile Icon"/>
              Perfil
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">O meu Perfil</a>
                <a className="dropdown-item" href="#">Log-Out</a>
              </div>
              </a>
            </li>
            <li className="nav-item nav-item-flex">
              <Link to="../../../Ajuda" className="nav-link">
              <img src="../src/images/ajuda_icon.png" width="25" height="25" alt="Help Icon"/>
              Ajuda
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBarClient;
