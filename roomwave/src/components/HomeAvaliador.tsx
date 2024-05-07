import React, { useState } from 'react';
import '../css/HomeAvaliador.css';
import NavBarAvaliador from './NavBarAvaliador';
import { useUser } from "./UserContext";
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import Footer from "./footer";


function HomeAvaliador() {
    return (
        <div>
            <NavBarAvaliador />
        </div>
        <div>
            <h1>HomeAvaliador</h1>
        </div>
    );
}

export default HomeAvaliador;