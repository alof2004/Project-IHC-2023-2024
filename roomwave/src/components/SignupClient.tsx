import NavBar from './NavBar';
import ClientForm from './ClientForm';
import React from 'react';
import { Link } from 'react-router-dom';


function SignupClient() {
    return (
        <div>
            <NavBar />
            <ClientForm/>
        </div>
    );
}
export default SignupClient;