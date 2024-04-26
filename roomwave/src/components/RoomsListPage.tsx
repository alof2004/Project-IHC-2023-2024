import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/RoomsListPage.css';
import roomsData from './rooms.json'; // Import the JSON data
import '../css/FilterButtons.css';
interface Room {
 id: number;
 Proprietaria: string;
 imagem1: string;
 imagem2?: string;
 imagem3: string;
 imagem4: string;
 localizacao: string;
 Locais_proximos: string[];
 cidade: string;
 país: string;
 latitude: number;
 longitude: number;
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
 Equipamento_disponivel: string[];
 Genero: string[];
}
const city = window.location.pathname.split("/")[2]; // Get the city from the URL

function RoomsListPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const navigate = useNavigate(); // Use the useNavigate hook
    const [filters, setFilters] = useState({ city: '', minPrice: 0, genero: ''}); // State to hold the current filters
    const roomsCity = roomsData.filter(room => room.cidade === city); // Filter rooms by city

    useEffect(() => {
        // Set the rooms state with the data from rooms.json
        setRooms(roomsData);
    }, []);

    const handleFilter = (newFilters: { city?: string; minPrice?: number; genero?: string}) => {
        setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    };

     const filteredRooms = roomsCity.filter(room => {
        // Apply city filter
        if (filters.city && room.cidade !== filters.city) return false;
        // Apply price filter
        if (filters.minPrice && room.price < filters.minPrice) return false;
        // If no filters are applied, show all rooms
        if (filters.genero && !room.Genero.includes(filters.genero)) return false;
        return true;
    });


    return (
        <div>
            <h1>Rooms List</h1>
            <div>
                <select className="button-87">
                    <option onClick={()=> handleFilter({genero: 'Masculino'})} value="Masculino">Masculino</option>
                    <option onClick={()=> handleFilter({genero: 'Feminino'})} value="Feminino">Feminino</option>
                </select>
                <select className="button-79">
                    <option onClick={()=> handleFilter({genero: 'Masculino'})} value="Masculino">Masculino</option>
                    <option onClick={()=> handleFilter({genero: 'Feminino'})} value="Feminino">Feminino</option>
                </select>               
                <button onClick={() => handleFilter({ city: 'City1' })}>City1</button>
                <button onClick={() => handleFilter({ city: 'City2' })}>City2</button>
                <button onClick={() => handleFilter({ city: '', minPrice:0})}>All</button>
                <button onClick={() => handleFilter({ minPrice: 101 })}>Price 50€</button>
            </div>
            <div className="projcard-container">
                {filteredRooms.map(room => (
                    <div key={room.id} className="projcard projcard-blue" onClick={() => navigate(`/room/${room.id}`)}>
                        <div className="projcard-innerbox">
                            <img className="projcard-img" src={room.imagem1} alt={`Room ${room.id}`} />
                            <div className="projcard-textbox">
                                <div className="projcard-title">{room.description}</div>
                                <div className="projcard-subtitle">{room.localizacao}</div>
                                <div className="projcard-description">{room.description}</div>
                                <div className="projcard-tagbox">
                                    {room.servicos.map((service, index) => (
                                        <span key={index} className="projcard-tag">{service}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                            <div className="projcard-price" style={{float:"right", padding:"10px 10px 0px 0px", fontSize:"20px"}}>{room.price}€ / mês</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RoomsListPage;