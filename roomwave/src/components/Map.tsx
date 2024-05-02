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
  const [hoveredRoom, setHoveredRoom] = useState<Room | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const MyComponent: React.FC = () => {
    const map = useMap();

    useEffect(() => {
      const room = details[0]; // Assuming there's only one room in the array
      const marker = L.marker([room.latitude, room.longitude], { icon }).addTo(map);
      
      marker.on('mouseover', () => {
        setHoveredRoom(room);
        setPopupOpen(true);
      }).on('mouseout', () => {
        setHoveredRoom(null);
        setPopupOpen(false);
      });

      return () => {
        marker.remove(); // Cleanup marker when component unmounts
      };
    }, [map]);

    return null;
  };

  const getFavoriteRooms = () => {
    const favoriteRooms = localStorage.getItem('favoriteRooms');
    return favoriteRooms ? JSON.parse(favoriteRooms) : [];
};
  const room = details[0]; // Assuming there's only one room in the array
  const position: [number, number] = [room.latitude, room.longitude];
  const navigate = useNavigate();
  const isFavorite = getFavoriteRooms().includes(room.id);
  const today = new Date();
  const roomEndDate = new Date(room.data_saida);
  const roomStartDate = new Date(room.data_entrada);
  const isAvailableToday = isToday(today) && today >= roomStartDate && today <= roomEndDate;
  let nextAvailableDate = null;




  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "100vh" }}
      dragging={false}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyComponent />
      {popupOpen && hoveredRoom && (
        <Popup position={[hoveredRoom.latitude, hoveredRoom.longitude]} className="custom-popup" >
              <div className="custom-popup-content" style={{width:"1000px"}}>
                    <div key={room.id} className="projcard projcard-blue" onClick={() => navigate(`/room/${room.id}`)}>
                        <div className="projcard-innerbox">
                        <img className="projcard-img" src={hoveredRoom.imagem1} alt={`Room ${hoveredRoom.id}`} />
                        <div className="projcard-textbox">
                            <div className="projcard-title">{hoveredRoom.description}</div>
                            <div className="projcard-subtitle"><span className="location-label" style={{color:"#FF7A41",fontWeight:"bold"}}>Localização: </span>{room.localizacao}</div>
                            <div className="projcard-subtitle" style={{ fontFamily: "Circular, Helvetica, sans-serif", color: isAvailableToday ? 'green' : 'red' }}>
                                {isAvailableToday ? (
                                    <span>Disponível hoje</span>
                                ) : (
                                    <span>Indisponível até {nextAvailableDate}</span>
                                )}
                            </div>
                            <div className="projcard-subtitle"><StarRating rating={(room.Avaliacao)} /> {/* Display the star rating */}
                            </div>

                            <div className="projcard-description">{room.description}</div>
                            <div className="containerList">
                                <div className="row-list">
                                    <div className="projcard-description-items">
                                        <img className="mini" src="../../src/images/bed.png" /> Cama {room.Cama}
                                    </div>
                                    <div className="projcard-description-items">
                                        <img className="mini" src="../../src/images/building.png" />Andar: {room.Andar}
                                    </div>
                                </div>
                                <div className="row-list">
                                    <div className="projcard-description-items">
                                        <img className="mini" src="../../src/images/area.png" /> Área total: {room.area} m²
                                    </div>
                                    <div className="projcard-description-items">
                                        <img className="mini" src="../../src/images/WC.png" />WC {room.WC}
                                    </div>
                                </div>
                            </div>
                            <div className="projcard-tagbox">
                            {room.mobilia.map((service, index) => (
                                <span key={index} className="projcard-tag">{service}</span>
                            ))}
                            </div>
                        </div>
                        </div>
                        <div className="projcard-price" style={{float:"right", padding:"10px 10px 0px 0px", fontSize:"20px"}}>{room.price}€ / mês
                        <br /> 
                        <span style={{fontSize:"15px"}}>Despesas {room.gastos}</span>
                        </div>
                        <div className="centered-heart">
                        <div onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
                            <HeartIcon roomId={room.id} isFavorite={isFavorite} />
                        </div>
                        </div>
                    </div>
                  </div>
        </Popup>
      )}
    </MapContainer>
  );
};

export default MyMapApp;
