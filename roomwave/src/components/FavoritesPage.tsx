import React, { useState, useEffect } from 'react';
import '../css/FavoritesPage.css';
import { useUser } from "./UserContext";
import { useNavigate } from 'react-router-dom';
import HeartIcon from './HeartIcon';
import roomsData from './rooms.json';
import Modal from './Modal';
import NavBar from './NavBar';


function FavoritesPage(){
    const [favoriteRooms, setFavoriteRooms] = useState<number[]>([]);
    const { user } = useUser();
    const navigate = useNavigate();

    const getFavoriteRooms = () => {
        const favoriteRooms = localStorage.getItem('favoriteRooms');
        return favoriteRooms ? JSON.parse(favoriteRooms) : [];
    };
    // Load favorite rooms from local storage on component mount
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favoriteRooms') ?? '') || [];
        setFavoriteRooms(storedFavorites);
    }, []); /* This centers the element horizontally */


    // Filter the rooms based on favorite room IDs
    const favoriteRoomDetails = roomsData.filter(room => favoriteRooms.includes(room.id));



    return (
        <div>
            <NavBar/>
        <div className="favorites-container">
        <div className='titulos gradient-effect'>
        <h2>Os meus Quartos favoritos</h2>
        <h5>Adicionou {favoriteRoomDetails.length} aos favoritos</h5>
        </div>

            {favoriteRoomDetails.length > 0 ? (
                favoriteRoomDetails.map(room => {
                    const isFavorite = getFavoriteRooms().includes(room.id);
                    // Determine if the room is favorited
                    return (
                    <div key={room.id} className="projcard projcard-blue mudar" onClick={() => navigate(`/room/${room.id}`)}>
                        <div className="projcard-innerbox">
                        <img className="projcard-img" src={room.imagem1} alt={`Room ${room.id}`} />
                        <div className="projcard-textbox">
                            <div className="projcard-title">{room.description}</div>
                            <div className="projcard-subtitle">{room.localizacao}</div>
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
                                        <img className="mini" src="../../src/images/WC.png" />{room.WC}
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
                        <div className="projcard-price" style={{float:"right", padding:"10px 10px 0px 0px", fontSize:"20px"}}>{room.price}€ / mês</div>
                        <div className="centered-heart">
                        <div onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
                            <HeartIcon roomId={room.id} isFavorite={isFavorite} />
                        </div>
                        </div>
                    </div>
                    );
                })
                ) : (
                <Modal />
                )}
            <button className="return" onClick={() => navigate('/home')}>Voltar para a página inicial</button>
        </div>
        </div>
    );
}

export default FavoritesPage;
