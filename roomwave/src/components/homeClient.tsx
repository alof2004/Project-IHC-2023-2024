import React from 'react';
import NavBarClient from './NavBarClient';
import { useUser } from "./UserContext";
import HomeText from './HomeText';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import CardsClientHome from './cardsClientHome';


function HomeClient() {
    const { user } = useUser();
    const [selectedCity, setSelectedCity] = useState('');
    const navigate = useNavigate();
  
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCity(e.target.value);
      if (e.target.value) {
        navigate(`/rooms/${e.target.value}`);
      }
    }
  
    const url = window.location.href;
    const lastSegment = url.substring(url.lastIndexOf('/') + 1);
    console.log(lastSegment); // Output: "Guarda"
  

    return (
        <div>
            <NavBarClient />
    <div>
      <header className="w3-display-container w3-content w3-wide" style={{ position: "relative", maxWidth: "100%" }} id="home">
        <img className="w3-image" src="../src/images/homepage.png" alt="Architecture" style={{ width: "100%", height: "auto" }} />
        
        {/* Select bar */}
        <div style={{ position: "absolute", top: "0", textAlign:'center', width: "100%", height: "50px", justifyContent:'center', alignItems:"center", paddingTop:"140px"}}>
          <HomeText />
          <form> {/* Removed onSubmit attribute */}
            <select  className="homeSelect" value={selectedCity} onChange={handleChange} style={{ 
              width: "900px",
              height: "90px", 
              fontSize: "30px", 
              paddingLeft: "20px", 
              paddingRight: "30px", 
              lineHeight: "50px", 
              backgroundPositionX: "calc(100% - 20px)", 
              backgroundColor: "#252525", 
              color:"white", 
              borderRadius: "5", 
              border: "5px solid #FF7A41", 
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
              outline: "none",
            }}>
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
          </form>
        </div>
      </header>
        </div>
        <CardsClientHome />
        <Footer />
    </div>
    );
}

export default HomeClient;
