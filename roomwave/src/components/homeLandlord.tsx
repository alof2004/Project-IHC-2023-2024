import React from 'react';
import { useUser } from "./UserContext";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import CardsClientHome from './cardsLandlord';
import ImageHome from './ImageHome';
import LastImageHome from './LastImageHome';
import NavBarLandLord from './NavBarLandLordHOME';


function homeLandlord() {
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
      <NavBarLandLord />
      <div>
      </div>
      <img className="w3-image" src="../src/images/homepage.png" alt="Architecture" style={{ width: "100%", height: "auto" }} />
      <button
        className="buttonAddRoom" // 
        style={{
          backgroundColor: '#252525',
          color: '#ffffff',
          position: 'absolute',
          fontSize: '70px',
          top: '300px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '999',
          borderRadius: '30px',
          width: '1000px',
          height: '150px',
          border: "5px solid #FF7A41",
          boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",

        }}
        onClick={() => navigate('/addRoom')}
      >
        <img src="../../src/images/mais.png" alt="Mais" style={{ marginRight: '10px', width: '50px', height: '50px' }} />
        Adicionar quarto
      </button>
      <CardsClientHome />
      <ImageHome />
      <LastImageHome />
      <Footer />
    </div>
  );
}                       

export default homeLandlord;
