import React, { useState } from 'react';
import '../css/ClientForm.css';
import { useUser } from "./UserContext";
import fs from 'fs'; // Import Node.js file system module
import { useNavigate } from 'react-router-dom';



function LandlordForm(){
    // Define state variables to store form field values
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setDateOfBirth] = useState('');
    const [city, setRole] = useState(''); // Assuming the user's role is either 'student' or 'worker'
    const [phone, setPhoneNumber] = useState('');
    const [type, setType] = useState('landlord'); // Assuming the user's type is 'client'
    const { loginUser } = useUser();
    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  // Prevent the default form submission behavior
        
        // Construct an object with the form data
        const formData = {
            firstname,
            lastname,
            email,
            type,
            password,
            birthdate,
            job: "landlord",
            phone,
            city
        };

        console.log(formData);      
        localStorage.setItem('userData', JSON.stringify(formData));
        console.log('Form data saved to local storage');
        loginUser(formData);
        navigate("../../homeClient")


    };

    return ( 
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className="name-inputs">
                    <input 
                        type="text" 
                        placeholder="First Name" 
                        value={firstname} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Last Name" 
                        value={lastname} 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                    />
                </div>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <div className="job-pass">
                    <input 
                        type="date" 
                        placeholder="Date of Birth" 
                        value={birthdate} 
                        onChange={(e) => setDateOfBirth(e.target.value)} 
                        required 
                    />
                    <select 
                        value={city} 
                        onChange={(e) => setRole(e.target.value)} 
                        required 
                    >
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
                <input 
                    type="text" 
                    placeholder="Phone-Number" 
                    value={phone} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    required 
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default LandlordForm;
