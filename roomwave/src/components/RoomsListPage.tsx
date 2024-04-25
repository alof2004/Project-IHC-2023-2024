import React, { useEffect, useState } from 'react';
import '../css/RoomsListPage.css';
import roomsData from './rooms.json'; // Import the JSON data

interface Room {
 id: number;
 Proprietaria: string;
 imagem1: string;
 imagem2?: string;
 imagem3: string;
 imagem4: string;
 localizacao: string;
 Locais_proximos: string;
 cidade: string;
 description: string;
 Transportes: string;
 servicos: string[];
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
 area: string;
 Vista: string;
 Renda_inclui: string[];
}

function RoomsListPage() {
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        // Set the rooms state with the data from rooms.json
        setRooms(roomsData);
    }, []);

    return (
        <div>
            <h1>Rooms List</h1>
            <div className="projcard-container">
                {/* Iterate through each room */}
                {rooms.map(room => (
                    <div key={room.id} className="projcard projcard-blue">
                        <div className="projcard-innerbox">
                            <img className="projcard-img" src={room.imagem1} alt={`Room ${room.id}`} />
                            <div className="projcard-textbox">
                                <div className="projcard-title">{room.description}</div>
                                <div className="projcard-subtitle">{room.localizacao}</div>
                                <div className="projcard-description">{room.description}</div>
                                <div className="projcard-tagbox">
                                    {/* Iterate through each service */}
                                    {room.servicos.map((service, index) => (
                                        <span key={index} className="projcard-tag">{service}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RoomsListPage;