import React, { useEffect, useState } from "react";
import details from './rooms.json';

function Foundcoord(){
    const [lat, setLat] = useState<number | undefined>();
    const [lon, setLon] = useState<number | undefined>();
    const room = details[0]; // Assuming there's only one room in the array

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        });
    });

    room.latitude = lat ?? 0;
    room.longitude = lon ?? 0;

    return(
        null
    );
}
export default Foundcoord;