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
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "500px" }}>
        <HomeText />

          <select style={{ width: "100%", fontSize: "18px", padding: "10px" }}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
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
