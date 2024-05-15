import React, { useState, useEffect } from 'react';
import '../css/FavoritesPage.css';
import { useNavigate } from 'react-router-dom';
import HeartIcon from './HeartIcon';
import roomsData from './rooms.json';
import NavBar from './NavBar';

function FavoritesPage() {
    const [favoriteRooms, setFavoriteRooms] = useState<number[]>([]);
    const navigate = useNavigate();

    // Function to get favorite rooms from local storage
    const getFavoriteRooms = () => {
        const favoriteRooms = localStorage.getItem('favoriteRooms');
        return favoriteRooms ? JSON.parse(favoriteRooms) : [];
    };

    // Load favorite rooms from local storage on component mount
    useEffect(() => {
        const storedFavorites = getFavoriteRooms();
        setFavoriteRooms(storedFavorites);
    }, []);

    // Filter the rooms based on favorite room IDs
    const favoriteRoomDetails = roomsData.filter(room => favoriteRooms.includes(room.id));

    return (
        <div>
            <NavBar />
            <div className="favorites-container">
                <div className='titulos gradient-effect'>
                    <h2>Os meus Quartos favoritos</h2>
                    <h5>Adicionou {favoriteRoomDetails.length} aos favoritos</h5>
                </div>

                {favoriteRoomDetails.length > 0 ? (
                    favoriteRoomDetails.map(room => {
                        const isFavorite = favoriteRooms.includes(room.id);
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
                                                    <img className="mini" src="../../src/images/bed.png" alt="Cama" /> Cama {room.Cama}
                                                </div>
                                                <div className="projcard-description-items">
                                                    <img className="mini" src="../../src/images/building.png" alt="Andar" />Andar: {room.Andar}
                                                </div>
                                            </div>
                                            <div className="row-list">
                                                <div className="projcard-description-items">
                                                    <img className="mini" src="../../src/images/area.png" alt="Área total" /> Área total: {room.area} m²
                                                </div>
                                                <div className="projcard-description-items">
                                                    <img className="mini" src="../../src/images/WC.png" alt="WC" />{room.WC}
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
                                <div className="projcard-price" style={{ float: "right", padding: "10px 10px 0px 0px", fontSize: "20px" }}>
                                    {room.price}€ / mês
                                </div>
                                <div className="centered-heart">
                                    <div onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
                                        <HeartIcon roomId={room.id} isFavorite={isFavorite} />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <></>
                )}
                <button className="return" onClick={() => navigate('/homeClient')}>Voltar para a página inicial</button>
            </div>
        </div>
    );
}

export default FavoritesPage;
