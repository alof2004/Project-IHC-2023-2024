import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate

import '../css/RoomsListPage.css';
import roomsData from './rooms.json'; // Import the JSON data
import '../css/FilterButtons.css';
import PriceRange from './PriceRange';
import Modal from './Modal';
import HeartIcon from './HeartIcon';
import NavBar from './NavBar';

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
 area: number;
 Vista: string;
 Renda_inclui: string[];
 Equipamento_disponivel: string[];
 Genero: string[];
 TipoQuarto: string;
 WC: string;
 Alojamento: string;
 Avaliado: string;
 Avaliacao: number;
}

interface PriceRangeProps {
    onRangeChange: (newRange: [number, number]) => void;
}

function RoomsListPage() {
    const { city } = useParams(); // Get the current city from the URL
    const [rooms, setRooms] = useState<Room[]>([]);
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        minPrice: 0,
        genero: '',
        tipoCasa: '',
        WC: '',
        Alojamento: '',
        animais: '',
        gastos: '',
    });
    const [priceRange, setPriceRange] = useState([10, 1500]);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const availableServices = Array.from(new Set(roomsData.flatMap(room => room.servicos)));
    const availableElectro = Array.from(new Set(roomsData.flatMap(room => room.Equipamento_disponivel)));
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [isOptionsVisible1, setIsOptionsVisible1] = useState(false);
    const [sortOrderPrice, setSortOrderPrice] = useState<'asc' | 'desc'>('desc'); // Start with descending order
    const [sortOrderArea, setSortOrderArea] = useState<'asc' | 'desc'>('desc'); // Start with descending order
    const [sortOrderEvaluated, setSortOrderEvaluated] = useState<'asc' | 'desc'>('desc'); // Start with descending order
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
    let active: string | null = null;



    

     const getFavoriteRooms = () => {
        const favoriteRooms = localStorage.getItem('favoriteRooms');
        return favoriteRooms ? JSON.parse(favoriteRooms) : [];
    };

    const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const service = e.target.value;
        if (e.target.checked) {
            setSelectedServices(prevServices => [...prevServices, service]);
        } else {
            setSelectedServices(prevServices => prevServices.filter(s => s !== service));
        }
    };

    const handleElectroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        const filtered = roomsData.filter(room => room.cidade === city);
        setRooms(filtered);
        setFilteredRooms(filtered);
    }, [city]);

    useEffect(() => {
        const newFilteredRooms = rooms.filter(room => {
            if (filters.genero && !room.Genero.includes(filters.genero)) return false;
            if ((priceRange[0] && room.price < priceRange[0]) || (priceRange[1] && room.price > priceRange[1])) return false;
            if (filters.tipoCasa && room.TipoQuarto !== filters.tipoCasa) return false;
            if (selectedServices.length > 0 && !selectedServices.every(service => room.servicos.includes(service))) return false;
            if (filters.WC && room.WC !== filters.WC) return false;
            if (filters.Alojamento && room.Alojamento !== filters.Alojamento) return false;
            if (filters.animais && room.Animais !== filters.animais) return false;
            if (filters.gastos && room.gastos !== filters.gastos) return false;
            return true;
        });
        setFilteredRooms(newFilteredRooms);
    }, [rooms, filters, priceRange, selectedServices]);

    const handleFilter = (newFilters: { minPrice?: number; genero?: string; tipoCasa?: string; WC?: string; Alojamento?: string, animais?:string, gastos?: string}) => {
        setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    };

    const handleSortOrder = (sortCriteria: string) => {
        let sortedRoomsCopy = [...filteredRooms];
        
        switch (sortCriteria) {
            case 'price':
                active = 'price';
                sortedRoomsCopy.sort((a, b) => {
                    if (sortOrderPrice === 'asc') {
                        return a.price - b.price;
                    } else {
                        return b.price - a.price;
                    }
                });
                setSortOrderPrice(sortOrderPrice === 'asc' ? 'desc' : 'asc'); // Toggle sort order
                break;
            case 'area':
                active = 'area';
                sortedRoomsCopy.sort((a, b) => {
                    if (sortOrderArea === 'asc') {
                        return a.area - b.area;
                    } else {
                        return b.area - a.area;
                    }
                });
                setSortOrderArea(sortOrderArea === 'asc' ? 'desc' : 'asc'); // Toggle sort order
                break;
            case 'evaluated':
                active = 'evaluated';
                sortedRoomsCopy.sort((a, b) => {
                    if (sortOrderEvaluated === 'asc') {
                        return a.Avaliacao - b.Avaliacao;
                    } else {
                        return b.Avaliacao - a.Avaliacao;
                    }
                });
                setSortOrderEvaluated(sortOrderEvaluated === 'asc' ? 'desc' : 'asc'); // Toggle sort order
                break;
            default:
                break;
        }
        
        setFilteredRooms(sortedRoomsCopy);
    };
    
    

    return (
        <div>
            <div>
                <NavBar/>
            </div>      
            <h1>Lista de quartos em {city}:</h1>
            <div style={{display:"flex", margin:"30px 30px 20px 20px", backgroundColor:"white"}}>
                <div style={{ width: '20%', margin: '0px', paddingTop:"10px", paddingBottom:"10px" }}>
                <PriceRange onRangeChange={handlePriceRangeChange} />
                <div>
                    <button
                        style={{
                        width: '20rem',
                        padding: '20px',
                        margin: '10px',
                        marginTop: '0px',
                        marginBottom: '0px',
                        backgroundColor: '#252525',
                        color: 'white',
                        border: 'none',
                        borderTop: '1px solid #white',
                        fontSize:'20px',
                        fontFamily: "Circular,Helvetica,sans-serif",
                        fontWeight: "700",
                        letterSpacing: "-.01em",
                        borderBottom: '2px solid white',
                        }}
                        onClick={() => setIsOptionsVisible(!isOptionsVisible)}
                    >
                        Filtrar por mobília disponível:
                    </button>
                    {isOptionsVisible && (
                        <div
                        style={{
                            width: '20rem',
                            padding: '20px',
                            margin: '10px',
                            marginBottom: '0px',
                            borderTop: '1px solid #333',
                            marginTop: '0px',
                            backgroundColor: '#252525',
                            color: 'white',
                            border: 'none',

                        }}
                        >
                        <fieldset>
                            {availableServices.map((service) => (
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
                    )}
                </div>
                <div>
                    <button
                        style={{
                        width: '20rem',
                        padding: '20px',
                        margin: '10px',
                        marginTop: '0px',
                        marginBottom: '0px',
                        backgroundColor: '#252525',
                        color: 'white',
                        border: 'none',
                        borderTop: '1px solid #333',
                        fontSize:'20px',
                        fontFamily: "Circular,Helvetica,sans-serif",
                        fontWeight: "700",
                        letterSpacing: "-.01em",
                        borderBottom: '1px solid #333',
                        }}
                        onClick={() => setIsOptionsVisible1(!isOptionsVisible1)}
                    >
                        Filtrar por aparelhos eletrónicos disponível:
                    </button>
                    {isOptionsVisible1 && (
                        <div
                        style={{
                            width: '20rem',
                            padding: '20px',
                            margin: '10px',
                            marginBottom: '0px',
                            borderTop: '1px solid #333',
                            marginTop: '0px',
                            backgroundColor: '#252525',
                            color: 'white',
                            border: 'none',

                        }}
                        >
                        <fieldset>
                            {availableElectro.map((eletronicos) => (
                            <div className="form__group" key={eletronicos}>
                                <input
                                type="checkbox"
                                id={eletronicos}
                                value={eletronicos}
                                name="services"
                                onChange={handleElectroChange}
                                checked={selectedServices.includes(eletronicos)}
                                />
                                <label htmlFor={eletronicos}>{eletronicos}</label>
                            </div>
                            ))}
                        </fieldset>
                        </div>
                    )}
                </div>
                <div>
                    <select className="button-79" onChange={(e) => handleFilter({ genero: e.target.value })}>
                        <option onClick={()=> handleFilter({genero: ''})} value="">Género:</option>
                        <option onClick={()=> handleFilter({genero: 'Masculino'})} value="Masculino">Masculino</option>
                        <option onClick={()=> handleFilter({genero: 'Feminino'})} value="Feminino">Feminino</option>
                        <option onClick={()=> handleFilter({genero: 'Casais'})} value="Casais">Casais</option>
                    </select>
                </div>
                <div>
                    <select className="button-79" onChange={(e) => handleFilter({ tipoCasa: e.target.value })}>
                        <option onClick={()=> handleFilter({tipoCasa: ''})} value="">Número de Quartos:</option>
                        <option onClick={()=> handleFilter({tipoCasa: 'T1'})} value="T1">T1</option>
                        <option onClick={()=> handleFilter({tipoCasa: 'T2'})} value="T2">T2</option>
                        <option onClick={()=> handleFilter({tipoCasa: 'T3'})} value="T3">T3</option>
                        <option onClick={()=> handleFilter({tipoCasa: 'T4'})} value="T4">T4</option>
                        <option onClick={()=> handleFilter({tipoCasa: 'T5'})} value="T5">T5</option>
                    </select>
                </div>
                <div>
                    <select className="button-79" onChange={(e) => handleFilter({ Alojamento: e.target.value })}>
                        <option onClick={()=> handleFilter({Alojamento: ''})} value="">Alojamento:</option>
                        <option onClick={()=> handleFilter({Alojamento: 'Apartamento'})} value="Apartamento">Apartamento</option>
                        <option onClick={()=> handleFilter({Alojamento: 'Vivenda'})} value="Vivenda">Vivenda</option>
                        <option onClick={()=> handleFilter({Alojamento: 'Hostel'})} value="Hostel">Hostel</option>
                    </select>
                </div>
                <div>
                    <select className="button-79" onChange={(e) => handleFilter({ WC: e.target.value })}>
                        <option onClick={()=> handleFilter({WC: ''})} value="">WC</option>
                        <option onClick={()=> handleFilter({WC: 'Privado'})} value="Privado">Privado</option>
                        <option onClick={()=> handleFilter({WC: 'Partilhado'})} value="Partilhado">Partilhado</option>
                    </select>
                </div>
                <div>
                    <select className="button-79" onChange={(e) => handleFilter({ animais: e.target.value })}>
                        <option onClick={()=> handleFilter({animais: ''})} value="">Animais</option>
                        <option onClick={()=> handleFilter({animais: 'admitos'})} value="admitidos">Animais Permitidos</option>
                        <option onClick={()=> handleFilter({animais: 'proíbidos'})} value="proíbidos">Animais Proíbidos</option>
                    </select>
                </div>
                <div>
                    <select className="button-79" onChange={(e) => handleFilter({ gastos: e.target.value })}>
                        <option onClick={()=> handleFilter({gastos: ''})} value="">Gastos incluídos:</option>
                        <option onClick={()=> handleFilter({gastos: 'incluídos'})} value="incluídos">Incluídos</option>
                        <option onClick={()=> handleFilter({gastos: 'não incluídos'})} value="admitidos">Não Incluídos</option>
                    </select>
                </div>
            </div>

            <div className="projcard-container" style={{ width: '60%', float:"right"}} >
                <div>
                <button className={`button-79 ${sortOrderPrice ? active: 'price' }`} onClick={() => handleSortOrder("price")}>
                    Ordenar por Preço {sortOrderPrice === 'asc' ? 'decrescente ↑' : 'crescente ↓'}
                </button>
                <button className={`button-79 ${sortOrderArea ? active : 'area'}`} onClick={() => handleSortOrder("area")}>
                    Ordenar por maior Área total {sortOrderArea === 'asc' ? 'decrescente ↑' : 'crescente ↓'}
                </button>
                <button className={`button-79 ${sortOrderEvaluated ? active : 'evaluated'}`} onClick={() => handleSortOrder("evaluated")}>
                    Ordenar por Avaliação {sortOrderEvaluated === 'asc' ? 'decrescente ↑' : 'crescente ↓'}
                </button>
                </div>
                 
            {rooms.length > 0 ? (
                filteredRooms.map(room => {
                    // Determine if the room is favorited
                    const isFavorite = getFavoriteRooms().includes(room.id);

                    return (
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
            </div>
            </div>
        </div>
        
    );
}

export default RoomsListPage;