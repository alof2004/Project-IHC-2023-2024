import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/RoomsListPage.css';
import roomsData from './rooms.json'; // Import the JSON data
import '../css/FilterButtons.css';
import PriceRange from './PriceRange';
import { Checkbox } from '@mui/material';
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
 TipoQuarto: string;
}
const city = window.location.pathname.split("/")[2]; // Get the city from the URL

interface PriceRangeProps {
    onRangeChange: (newRange: [number, number]) => void;
}

function RoomsListPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const navigate = useNavigate(); // Use the useNavigate hook
    const [filters, setFilters] = useState({ city: '', minPrice: 0, genero: '', tipoCasa: '', }); // State to hold the current filters
    const roomsCity = roomsData.filter(room => room.cidade === city); // Filter rooms by city
    const [priceRange, setPriceRange] = useState([10, 1500]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const availableServices = Array.from(new Set(roomsData.flatMap(room => room.servicos)));


    const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const service = e.target.value;
        if (e.target.checked) {
            setSelectedServices(prevServices => [...prevServices, service]);
        } else {
            setSelectedServices(prevServices => prevServices.filter(s => s !== service));
        }
    };

    const handlePriceRangeChange = (newRange: React.SetStateAction<number[]>) => {
       setPriceRange(newRange);
    };

    useEffect(() => {
        // Set the rooms state with the data from rooms.json
        setRooms(roomsData);
    }, []);

    const handleFilter = (newFilters: { city?: string; minPrice?: number; genero?: string; tipoCasa?: string}) => {
        setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    };

    const filteredRooms = roomsCity.filter(room => {
        // Apply city filter
        if (filters.city && room.cidade !== filters.city) return false;
    
        // Apply gender filter
        if (filters.genero && !room.Genero.includes(filters.genero)) return false;
    
        // Apply price range filter
        if ((priceRange[0] && room.price < priceRange[0]) || (priceRange[1] && room.price > priceRange[1])) return false;
        
        if (filters.tipoCasa && room.TipoQuarto !== filters.tipoCasa) return false;

        if (selectedServices.length > 0 && !selectedServices.every(service => room.servicos.includes(service))) return false;

    
        return true;
    });

    return (
        <div>
            <h1>Rooms List</h1>
            <div>
                <select className="button-79"  onChange={(e) => handleFilter({ genero: e.target.value })}>
                    <option onClick={()=> handleFilter({genero: ''})} value="">Género:</option>
                    <option onClick={()=> handleFilter({genero: 'Masculino'})} value="Masculino">Masculino</option>
                    <option onClick={()=> handleFilter({genero: 'Feminino'})} value="Feminino">Feminino</option>
                </select>
                <select className="button-79" onChange={(e) => handleFilter({ tipoCasa: e.target.value })}>
                    <option onClick={()=> handleFilter({tipoCasa: ''})} value="">Tipo de Casa:</option>
                    <option onClick={()=> handleFilter({tipoCasa: 'T1'})} value="T1">T1</option>
                    <option onClick={()=> handleFilter({tipoCasa: 'T2'})} value="T2">T2</option>
                    <option onClick={()=> handleFilter({tipoCasa: 'T3'})} value="T3">T3</option>
                    <option onClick={()=> handleFilter({tipoCasa: 'T4'})} value="T4">T4</option>
                    <option onClick={()=> handleFilter({tipoCasa: 'T5'})} value="T5">T5</option>
                </select>
                <button onClick={() => handleFilter({ city: 'City1' })}>City1</button>
                <button onClick={() => handleFilter({ city: 'City2' })}>City2</button>
                <button onClick={() => handleFilter({ city: '', minPrice:0})}>All</button>
                <button onClick={() => handleFilter({ minPrice: 101 })}>Price 50€</button>
                
                <PriceRange onRangeChange={handlePriceRangeChange} />
                <div style={{ width: "20rem", padding: "20px",margin:"10px", backgroundColor: "#252525", color: "white", borderRadius: "10px" }}>
                <fieldset>
                    <legend>Filtrar por serviços disponíveis:</legend>
                    {availableServices.map(service => (
                        <div className="form__group" key={service}>
                            <input
                                type="checkbox"
                                id={service}
                                value={service}
                                name="services"
                                onChange={handleServiceChange}
                                checked={selectedServices.includes(service)}
                            />
                            <label htmlFor={service}>{service}</label>
                        </div>
                    ))}
                </fieldset>
                </div>
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