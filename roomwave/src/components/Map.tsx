import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "./constants";
import details from './rooms.json';

const MyMapApp: React.FC = () => {
  const MyComponent: React.FC = () => {
    const map = useMap();

    useEffect(() => {
      const room = details[0]; // Assuming there's only one room in the array
      L.marker([room.latitude, room.longitude], { icon }).addTo(map);
    }, [map]);

    return null;
  };

  const room = details[0]; // Assuming there's only one room in the array
  const position: [number, number] = [room.latitude, room.longitude];

  return (
    <MapContainer
      center={position}
      zoom={150} // Adjusted zoom level to a more reasonable value
      style={{ height: "100vh" }}
      dragging={false} // Disabling the ability to drag the map
      scrollWheelZoom={false} // Disabling the ability to zoom via touchpad
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyComponent />
    </MapContainer>
  );
};

export default MyMapApp;
