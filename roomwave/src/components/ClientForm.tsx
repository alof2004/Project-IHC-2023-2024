import React, { useEffect, useState } from 'react';
import '../css/ClientForm.css';
import { useUser } from "./UserContext";
import { useNavigate, useLocation } from 'react-router-dom';



function ClientForm(){
    // Define state variables to store form field values
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setDateOfBirth] = useState('');
    const [job, setRole] = useState(''); // Assuming the user's role is either 'student' or 'worker'
    const [phone, setPhoneNumber] = useState('');
    const [type, setType] = useState('client'); // Assuming the user's type is 'client'
    const { loginUser } = useUser();
    const location = useLocation();
    const navigate = useNavigate();
  
  
    const redirectToSavedPath = () => {
      const savedPath = localStorage.getItem('redirectPath');
      console.log('Attempting to navigate to:', savedPath); // Debugging line
      if (savedPath && savedPath != "/Home" && savedPath != "/" && savedPath != "/login" && savedPath != "/signup/client" && savedPath != "signup/landlord")  {
        navigate(savedPath);
        localStorage.removeItem('redirectPath');
      }
      else{
        navigate("../../homeClient")
      }
    };
  
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
            job,
            phone,

        };

        console.log(formData);      
        localStorage.setItem('userData', JSON.stringify(formData));
        console.log('Form data saved to local storage');
        loginUser(formData);
        redirectToSavedPath();


    };

    return ( 
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className="name-inputs">
                    <input 
                        type="text" 
                        placeholder="Primeiro Nome" 
                        value={firstname} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required
                        title="Insira o seu primeiro nome." // Set a custom title attribute
                    />
                    <span className="name-space"> </span>
                    <input 
                        type="text" 
                        placeholder="Último Nome" 
                        value={lastname} 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                        title="Insira o seu último nome." 

                    />
                </div>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    title="Insira o seu email." 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    title="Insira uma password."
                />
                <div className="job-pass">
                    <input 
                        type="date" 
                        placeholder="Date of Birth" 
                        value={birthdate} 
                        onChange={(e) => setDateOfBirth(e.target.value)} 
                        required 
                    />
                    <span className="name-space"> </span>
                    <select 
                        className='job-select'
                        value={job} 
                        onChange={(e) => setRole(e.target.value)} 
                        required 
                    >
                        <option value="">Select Role</option>
                        <option value="student">Student</option>
                        <option value="worker">Worker</option>
                        <option value="other">Other</option>
                    </select>
                    <div className="arrow">&#x25BC;</div>
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

export default ClientForm;
