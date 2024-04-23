import React, { useState } from 'react';
import '../css/ClientForm.css';


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
                        value={job} 
                        onChange={(e) => setRole(e.target.value)} 
                        required 
                    >
                        <option value="">Select Role</option>
                        <option value="student">Student</option>
                        <option value="worker">Worker</option>
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

export default ClientForm;
