import NavBar from './NavBar';
import RoomForm from './RoomForm';
import React from 'react';
import { Link } from 'react-router-dom';


function AddRoom() {
    return (
        <div>
            <NavBar />
            <RoomForm/>
        </div>
    );
}
export default AddRoom;