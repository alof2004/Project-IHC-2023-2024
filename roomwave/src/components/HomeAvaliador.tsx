import NavBar from "./NavBar";
import NavBarAvaliador from "./NavBarAvaliador";
import React, { useState, useEffect } from 'react';
import '../css/FavoritesPage.css';
import { useUser } from "./UserContext";
import { useNavigate } from 'react-router-dom';
import roomsData from './rooms.json';
import Footer from "./footer";
import Avaliadortable from "./avaliadortable";


function HomeAvaliador() {
    const [RoomstoAval, setRoomstoAval] = useState<number[]>([]);
    const { user } = useUser();
    const navigate = useNavigate();

    const getRoomstoAval = () => {
        const rooms = localStorage.getItem('roomsData');
        console.log(rooms)
        if (rooms) {
            const parsedRooms = JSON.parse(rooms);
            // Filter rooms with "Avaliado" equal to "aguardar"
            const filteredRooms = parsedRooms.filter((room: { avaliado: string }) => room.avaliado === "aguardar");
            console.log(filteredRooms); // Adicione este console.log para ver os quartos selecionados
            return filteredRooms;
        } else {
            return [];
    }
    };
    // Load favorite rooms from local storage on component mount
    useEffect(() => {
        const storedFavorites = getRoomstoAval
        console.log(storedFavorites)
        setRoomstoAval(storedFavorites);
    }, []); /* This centers the element horizontally */
    console.log(RoomstoAval)


    // Filter the rooms based on favorite room IDs
    const favoriteRoomDetails = roomsData.filter(room => RoomstoAval.includes(room.id));

    console.log(favoriteRoomDetails)

    return (
        <><div>
            <NavBarAvaliador />
            <div className="favorites-container-1">
                <div className='titulos gradient-effect-1'>
                    <h2>Quartos à espera de avaliação</h2>
                    <h5>Existem {favoriteRoomDetails.length} a aguardar avaliação</h5>
                </div>

                {favoriteRoomDetails.length > 0 ? (
                    favoriteRoomDetails.map(room => {
                        const isFavorite = getRoomstoAval().includes(room.id);
                        return (
                            <div key={room.id} className="projcard projcard-blue mudar" onClick={() => navigate(`/room/${room.id}`)}>
                            </div>
                        );
                    })
                ) : (
                    <div className="no-favorites">
                    </div>
                )}
            </div>
        </div>
        <Avaliadortable />
            <div style={{marginTop:"10%"}}> 
                <Footer />
            </div></>
    );
}

export default HomeAvaliador;