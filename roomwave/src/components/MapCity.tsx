import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "./constants";
import details from './rooms.json';
import HeartIcon from "./HeartIcon";
import StarRating from "./StarRating";
import { useNavigate } from "react-router-dom";
import { isToday } from "date-fns";
import '../css/RoomsListPage.css'
import '../css/Map.css'

// Your Room interface remains unchanged
interface Room {
  id: number;
  Proprietaria: string;
  imagem1: string;
  imagem2?: string;
  imagem3?: string;
  imagem4?: string;
  localizacao: string;
  Locais_proximos: string[];
  cidade: string;
  país: string;
  latitude: number;
  longitude: number;
  description: string;
  Transportes: string;
  mobilia: string[];
  Descrição_Proprietaria: string;
  Cama: string;
  Cozinha: string;
  casas_de_banho: number;
  Ambiente: string;
  price: number;
  Pessoas_permitidas: string[];
  gastos: string;
  Animais: string;
  Fumadores: string;
  area: number;
  Vista: string;
  Renda_inclui: string[];
  Equipamento_disponivel: string[];
  Genero: string[];
  TipoQuarto: string;
  WC: string;
  Alojamento: string;
  Andar: string;
  Avaliado: string;
  Avaliacao: number;
  data_entrada: string;
  data_saida: string;
 }


 const MyMapApp: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const MyComponent: React.FC = () => {
    const map = useMap();

    useEffect(() => {
      details.forEach((room) => {
        const marker = L.marker([room.latitude, room.longitude], { icon }).addTo(map);
        
        marker.on('mouseover', () => {
          setSelectedRoom(room);
          setPopupOpen(true);
        }).on('mouseout', () => {
          setSelectedRoom(null);
          setPopupOpen(false);
        });

        return () => {
          marker.remove(); // Cleanup marker when component unmounts
        };
      });
    }, [map, details]);

    return null;
  };

  const getFavoriteRooms = () => {
    const favoriteRooms = localStorage.getItem('favoriteRooms');
    return favoriteRooms? JSON.parse(favoriteRooms) : [];
  };

  const navigate = useNavigate();
  const isFavorite = getFavoriteRooms().includes(selectedRoom?.id);
  const today = new Date();
  const selectedRoomEndDate = new Date(selectedRoom?.data_saida || '');
  const selectedRoomStartDate = new Date(selectedRoom?.data_entrada || '');
  const isAvailableToday = isToday(today) && today >= selectedRoomStartDate && today <= selectedRoomEndDate;
  let nextAvailableDate = null; // You might need to calculate this based on your data

  return (
    <MapContainer
      center={[40.393944738596296, -8.450301889205338]} // Example center coordinates, replace with actual city center
      zoom={13}
      style={{ height: "100vh" }}
      dragging={false}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyComponent />
      {popupOpen && selectedRoom && (
        <Popup position={[selectedRoom.latitude, selectedRoom.longitude]} className="custom-popup" >
          {/* Popup content goes here */}
        </Popup>
      )}
    </MapContainer>
  );
};

export default MyMapApp;