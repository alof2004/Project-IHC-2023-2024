import React from 'react';
import NavBar from './NavBar';
import HomeText from './HomeText';

function Home() {
  return (
    <div>
      <NavBar />
      <header className="w3-display-container w3-content w3-wide" style={{ position: "relative", maxWidth: "100%" }} id="home">
        <img className="w3-image" src="../src/images/homepage.png" alt="Architecture" style={{ width: "100%", height: "auto" }} />
        
        {/* Select bar */}
        <div style={{ position: "absolute", top: "0", left: "0", width: "80%", maxWidth: "400px", paddingLeft: "100px", paddingTop:"100px" }}>
          <HomeText />
          <select value="Procurar em:" style={{ width: "100%", height: "50px", fontSize: "20px", paddingLeft: "5px", paddingRight: "30px", lineHeight: "50px", backgroundPositionX: "calc(100% - 20px)" }}>
            <option value="">Cidade:</option>
            <option value="Aveiro">Aveiro</option>
            <option value="Beja">Beja</option>
            <option value="Braga">Braga</option>
            <option value="Bragança">Bragança</option>
            <option value="Castelo Branco">Castelo Branco</option>
            <option value="Coimbra">Coimbra</option>
            <option value="Évora">Évora</option>
            <option value="Faro">Faro</option>
            <option value="Guarda">Guarda</option>
            <option value="Leiria">Leiria</option>
            <option value="Lisboa">Lisboa</option>
            <option value="Portalegre">Portalegre</option>
            <option value="Porto">Porto</option>
            <option value="Santarém">Santarém</option>
            <option value="Setúbal">Setúbal</option>
            <option value="Viana do Castelo">Viana do Castelo</option>
            <option value="Vila Real">Vila Real</option>
            <option value="Viseu">Viseu</option>
          </select>
        </div>
      </header>
    </div>
  );
}

export default Home;
