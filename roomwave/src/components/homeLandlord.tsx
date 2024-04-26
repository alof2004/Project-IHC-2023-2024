import React from 'react';
import NavBarLandLord from './NavBarLandLord';
import { useUser } from "./UserContext";

function homeLandlord() {
  const { user } = useUser();
    console.log(user);
    // Check if user is not available yet
    if (!user) {
        return (
            <div>
                <NavBarLandLord />
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div>
            <NavBarLandLord />
            <h1>Welcome to the Client Home Page</h1>
            <h1>AAAAAAA {user.email}</h1>
        </div>
    );
}

export default homeLandlord;