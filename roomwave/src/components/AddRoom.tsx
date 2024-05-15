import NavBarLandLord from './NavBarLandLordHOME';
import RoomForm from './RoomForm';
import React from 'react';
import { Link } from 'react-router-dom';


function AddRoom() {
    return (
        <div>
            <NavBarLandLord />
            <RoomForm />
        </div>
    );
}
export default AddRoom;