import '../App.css'; // Adjust the path as necessary

function NavBar() {
return(<nav className="navbar border-bottom navbar-expand-lg myCustomNavbar" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img src="./src/images/roomWaveLogo.png" width="95" height="50"/>
    </a>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item nav-item-flex">
          <img src="./src/images/perfil_icon.png" width="30" height="30"/>
          <a className="nav-link" href="#">Log-In</a>
        </li>
        <li className="nav-item nav-item-flex">
          <img src="./src/images/ajuda_icon.png" width="25" height="25"/>
          <a className="nav-link" href="#">Ajuda</a>
        </li>
      </ul>
    </div>
  </div>
</nav>)
}

export default NavBar;