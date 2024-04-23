import React from 'react';
import NavBarClient from './NavBarClient';
import { useUser } from "./UserContext";

function HomeClient() {
    const { user } = useUser();
    console.log(user);
    // Check if user is not available yet
    if (!user) {
        return (
            <div>
                <NavBarClient />
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div>
            <NavBarClient />
            <h1>Welcome to the Client Home Page</h1>
            <h1>AAAAAAA {user.email}</h1>
        </div>
    );
}

export default HomeClient;
