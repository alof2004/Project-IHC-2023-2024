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
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "1000px" }}>
        <HomeText />

          <select  value="Procurar em:" style={{ width: "100%", fontSize: "18px", padding: "0px" }}>
              <option value="">Cidade</option>
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
        
        <div className="w3-display-middle w3-margin-top w3-center">
          <h1 className="w3-xxlarge w3-text-white"><span className="w3-padding w3-black w3-opacity-min"><b>BR</b></span> <span className="w3-hide-small w3-text-light-grey">Architects</span></h1>
        </div>
      </header>
    </div>
  );
}

export default Home;
