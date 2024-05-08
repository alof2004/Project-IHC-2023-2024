import React from 'react';
import NavBarClient from './NavBarClient';
import { useUser } from "./UserContext";
import HomeText from './HomeText';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import CardsClientHome from './cardsLandlord';
import ImageHome from './ImageHome';
import ImageHomeesquerda from './ImageHomeesqueda';
import LastImageHome from './LastImageHome';
import NavBarLandLord from './NavBarLandLord';


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
        <CardsClientHome />
        <ImageHome />
        <ImageHomeesquerda />
        <LastImageHome />
        <Footer />
    </div>
    );
}

export default homeLandlord;
