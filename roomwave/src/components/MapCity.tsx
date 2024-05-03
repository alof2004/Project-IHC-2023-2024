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
        
        marker.on('click', () => {
          navigate(`/room/${room.id}`);
        }).on('mouseover', () => {
          setSelectedRoom(room);
          setPopupOpen(true);
        }).on('mouseout', (e) => {
          // Check if the mouse is moving within the popup or its content
          const relatedTarget = (e as any).originalEvent.relatedTarget as HTMLElement;
          const popupContent = document.querySelector('.custom-popup-content');
          const popup = document.querySelector('.leaflet-popup-pane');
        
          if (popupContent && popupContent.contains(relatedTarget) || popup && popup.contains(relatedTarget)) {
            return;
          }
        
          setSelectedRoom(null);
          setPopupOpen(false);
        });
        
        
  
        return () => {
          marker.remove(); // Cleanup marker when component unmounts
        };
      });
    }, [map, details, navigate]);

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
                <div className="custom-popup-content" style={{width:"1000px"}}>
                    <div key={selectedRoom.id} className="projcard projcard-blue-1" style={{margin:"0px!important"}} onClick={() => navigate(`/room/${selectedRoom.id}`)}>
                        <div className="projcard-innerbox">
                        <img className="projcard-img" src={selectedRoom.imagem1} alt={`Room ${selectedRoom.id}`} />
                        <div className="projcard-textbox">
                            <div className="projcard-title">{selectedRoom.description}</div>
                            <div className="projcard-subtitle"><span className="location-label" style={{color:"#FF7A41",fontWeight:"bold"}}>Localização: </span>{selectedRoom.localizacao}</div>
                            <div className="projcard-subtitle" style={{ fontFamily: "Circular, Helvetica, sans-serif", color: isAvailableToday ? 'green' : 'red' }}>
                                {isAvailableToday ? (
                                    <span>Disponível hoje</span>
                                ) : (
                                    <span>Indisponível até {nextAvailableDate}</span>
                                )}
                            </div>
                            <div className="projcard-subtitle"><StarRating rating={(selectedRoom.Avaliacao)} /> {/* Display the star rating */}
                            </div>

                            <div className="projcard-description">{selectedRoom.description}</div>
                            <div className="containerList">
                                <div className="row-list">
                                    <div className="projcard-description-items">
                                        <img className="mini" src="../../src/images/bed.png" /> Cama {selectedRoom.Cama}
                                    </div>
                                    <div className="projcard-description-items">
                                        <img className="mini" src="../../src/images/building.png" />Andar: {selectedRoom.Andar}
                                    </div>
                                </div>
                                <div className="row-list">
                                    <div className="projcard-description-items">
                                        <img className="mini" src="../../src/images/area.png" /> Área total: {selectedRoom.area} m²
                                    </div>
                                    <div className="projcard-description-items">
                                        <img className="mini" src="../../src/images/WC.png" />WC {selectedRoom.WC}
                                    </div>
                                </div>
                            </div>
                            <div className="projcard-tagbox">
                            {selectedRoom.mobilia.map((service, index) => (
                                <span key={index} className="projcard-tag">{service}</span>
                            ))}
                            </div>
                        </div>
                        </div>
                        <div className="projcard-price" style={{float:"right", padding:"10px 10px 0px 0px", fontSize:"20px"}}>{selectedRoom.price}€ / mês
                        <br /> 
                        <span style={{fontSize:"15px"}}>Despesas {selectedRoom.gastos}</span>
                        </div>
                        <div className="centered-heart">
                        <div onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
                            <HeartIcon roomId={selectedRoom.id} isFavorite={isFavorite} />
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