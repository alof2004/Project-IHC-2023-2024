import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "./constants";
import details from './rooms.json';
import { useParams, useNavigate } from "react-router-dom";
import { isToday } from "date-fns";
import '../css/RoomsListPage.css'
import '../css/Map.css'

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
  const { ID } = useParams();
  const navigate = useNavigate();

  const MyComponent: React.FC = () => {
    const map = useMap();

    useEffect(() => {
      if (ID) {
        const room = details.find(room => room.id.toString() === ID);
        if (room) {
          setSelectedRoom(room);
          map.setView([room.latitude, room.longitude], 15); // Set map center to room coordinates
          const marker = L.marker([room.latitude, room.longitude], { icon }).addTo(map);

          marker.on('click', () => {
            navigate(`/room/${room.id}`);
          });
        }
      }
    }, [map, ID, navigate]);

    return null;
  };

  return (
    <MapContainer
      style={{ height: "100vh" }}
      scrollWheelZoom={false}

    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyComponent />
    </MapContainer>
  );
};


export default MyMapApp;
