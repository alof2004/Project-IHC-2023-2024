import NavBar from './NavBar';
import React from 'react';
import { Link } from 'react-router-dom';
import LandlordForm from './LandlordForm';


function SignupClient() {
    return (
        <div>
            <NavBar />
            <LandlordForm/>
        </div>
    );
}
export default SignupClient;