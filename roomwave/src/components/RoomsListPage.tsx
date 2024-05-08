import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate

import '../css/RoomsListPage.css';
import roomsData from './rooms.json'; // Import the JSON data
import '../css/FilterButtons.css';
import PriceRange from './PriceRange';
import Modal from './Modal';
import HeartIcon from './HeartIcon';
import NavBar from './NavBar';
import MyMapApp from './Map';
import { format, isToday } from 'date-fns';
import StarRating from './StarRating';
import MapModal from './MapModal';


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
    const [selectedElectro, setSelectedElectro] = useState<string[]>([]);
    const availableServices = Array.from(new Set(roomsData.flatMap(room => room.mobilia)));
    const availableElectro = Array.from(new Set(roomsData.flatMap(room => room.Equipamento_disponivel)));
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);
    const [isOptionsVisible1, setIsOptionsVisible1] = useState(false);
    const [isOptionsVisible2, setIsOptionsVisible2] = useState(false);
    const [sortOrderPrice, setSortOrderPrice] = useState<'asc' | 'desc'>('desc'); // Start with descending order
    const [sortOrderArea, setSortOrderArea] = useState<'asc' | 'desc'>('desc'); // Start with descending order
    const [sortOrderEvaluated, setSortOrderEvaluated] = useState<'asc' | 'desc'>('desc'); // Start with descending order
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
    const [activeButton, setActiveButton] = useState<string | null>(null); // Add state for active button
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [modalShow, setModalShow] = React.useState(false);


    const isAvailableToday = (room: Room): boolean => {
        const today = new Date();
        const roomStartDate = new Date(room.data_entrada);
        const roomEndDate = new Date(room.data_saida);
        return today >= roomStartDate && today <= roomEndDate;
    };


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
            setSelectedElectro(prevServices => [...prevServices, service]);
        } else {
            setSelectedElectro(prevServices => prevServices.filter(s => s !== service));
        }
    };

    const handlePriceRangeChange = (newRange: React.SetStateAction<number[]>) => {
        setPriceRange(newRange);
    };

    const handleStartDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setStartDate(e.target.value);
    };
    
    const handleEndDateChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setEndDate(e.target.value);
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
            if (selectedServices.length > 0 && !selectedServices.every(service => room.mobilia.includes(service))) return false;
            if (selectedElectro.length > 0 && !selectedElectro.every(eletronicos => room.Equipamento_disponivel.includes(eletronicos))) return false;
            if (filters.WC && room.WC !== filters.WC) return false;
            if (filters.Alojamento && room.Alojamento !== filters.Alojamento) return false;
            if (filters.animais && room.Animais !== filters.animais) return false;
            if (filters.gastos && room.gastos !== filters.gastos) return false;
            if (startDate || endDate) {
                const roomStartDate = new Date(room.data_entrada);
                const roomEndDate = new Date(room.data_saida);
                const selectedStartDate = new Date(startDate);
                const selectedEndDate = new Date(endDate);
                if (roomStartDate > selectedEndDate || roomEndDate < selectedStartDate) return false;
            }
            return true;
        });
        setFilteredRooms(newFilteredRooms);
    }, [rooms, filters, priceRange, selectedServices, selectedElectro, startDate, endDate]);

    const handleFilter = (newFilters: { minPrice?: number; genero?: string; tipoCasa?: string; WC?: string; Alojamento?: string, animais?:string, gastos?: string}) => {
        setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    };

    const handleSortOrder = (sortCriteria: string) => {
        let sortedRoomsCopy = [...filteredRooms];
        
        switch (sortCriteria) {
            case 'price':
                setActiveButton('price');
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
                setActiveButton('area');
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
                setActiveButton('evaluated');
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

    const sortedRooms = filteredRooms.sort((a, b) => {
        const isAvailableA = isAvailableToday(a);
        const isAvailableB = isAvailableToday(b);
    
        // Sort available rooms before unavailable ones
        if (isAvailableA && !isAvailableB) return -1;
        // Sort unavailable rooms after available ones
        if (!isAvailableA && isAvailableB) return 1;
        // If both rooms have the same availability status, maintain their current order
        return 0;
    });
    
    

    return (
        <div>
            <div>
                <NavBar/>
            </div>      
            <div className="filter-container" style={{display:"flex", margin:"30px 30px 20px 20px", backgroundColor:"#dedede", borderRadius:"10px", padding:"20px"}}>
                <div  style={{ margin: '0px', paddingTop:"10px", paddingBottom:"10px" }}>
                <button className="button-style mapa1" onClick={() => setModalShow(true)} >Ver no Mapa</button>
                <MapModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
                <PriceRange onRangeChange={handlePriceRangeChange} />
                <div>
                    <button
                        className="button-style"
                        onClick={() => setIsOptionsVisible(!isOptionsVisible)}
                    >
                        Filtrar por mobília disponível:
                    </button>
                    {isOptionsVisible && (
                        <div
                        style={{
                            width: '28rem',
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
                                <label  style={{marginTop:"0px"}} htmlFor={service}>{service}</label>
                            </div>
                            ))}
                        </fieldset>
                        </div>
                    )}
                </div>
                <div>
                    <button
                        className="button-style"
                        onClick={() => setIsOptionsVisible1(!isOptionsVisible1)}
                    >
                        Filtrar por aparelhos eletrónicos disponível:
                    </button>
                    {isOptionsVisible1 && (
                        <div
                        style={{
                            width: '28rem',
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
                                name="eletronicos"
                                onChange={handleElectroChange}
                                checked={selectedElectro.includes(eletronicos)}
                                />
                                <label style={{marginTop:"0px"}} htmlFor={eletronicos}>{eletronicos}</label>
                            </div>
                            ))}
                        </fieldset>
                        </div>
                    )}
                </div>
                <div>
                    <button
                        className="button-style"
                        onClick={() => setIsOptionsVisible2(!isOptionsVisible2)}
                    >
                        Filtrar por data de entrada/saíada:
                    </button>
                    {isOptionsVisible2 && (
                        <div
                        style={{
                            width: '28rem',
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
                            <div className="form__group">
                                <label  style={{marginTop:"0px"}} htmlFor="start_date">Data de entrada:</label>
                                <input style={{marginLeft:"10px"}} type="date" id="start_date" name="start_date" value={startDate} onChange={handleStartDateChange} />
                            </div>
                            <div className="form__group">
                                <label  style={{marginTop:"0px"}}  htmlFor="end_date">Data de saída:</label>
                                <input style={{marginLeft:"10px"}}  type="date" id="end_date" name="end_date" value={endDate} onChange={handleEndDateChange} />
                            </div>
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
                        <option onClick={()=> handleFilter({animais: 'permitidos'})} value="permitidos">Animais Permitidos</option>
                        <option onClick={()=> handleFilter({animais: 'não permitidos'})} value="não permitidos">Animais Proíbidos</option>
                    </select>
                </div>
                <div>
                    <select className="button-79" onChange={(e) => handleFilter({ gastos: e.target.value })}>
                        <option onClick={()=> handleFilter({gastos: ''})} value="">Despesas incluídas:</option>
                        <option onClick={()=> handleFilter({gastos: 'incluídas'})} value="incluídas">Incluídas</option>
                        <option onClick={()=> handleFilter({gastos: 'não incluídas'})} value="não incluídas">Não Incluídas</option>
                    </select>
                </div>
            </div>

            <div className="projcard-container" style={{ width: '75%', float:"right"}} >
            <h1>Lista de quartos em {city}:</h1>
                <h5>
                {filteredRooms.length === 1 ? (
                    <>Foi encontrado 1 quarto em {city}</>
                ) : (
                    <>Foram encontrados {filteredRooms.length} quartos em {city}</>
                )}
                </h5>
                <div className='sortButtons'>
                        <button className={`button-79 sort ${activeButton === 'price' ? 'active' : ''}`} onClick={() => handleSortOrder("price")}>
                            Ordenar por Preço {sortOrderPrice === 'asc' ? 'decrescente ↑' : 'crescente ↓'}
                        </button>
                        <button className={`button-79 sort ${activeButton === 'area' ? 'active' : ''}`} onClick={() => handleSortOrder("area")}>
                            Ordenar por maior Área total {sortOrderArea === 'asc' ? 'decrescente ↑' : 'crescente ↓'}
                        </button>
                        <button className={`button-79 sort ${activeButton === 'evaluated' ? 'active' : ''}`} onClick={() => handleSortOrder("evaluated")}>
                            Ordenar por Avaliação {sortOrderEvaluated === 'asc' ? 'decrescente ↑' : 'crescente ↓'}
                        </button>
                </div>
            
            {rooms.length > 0 ? (
                sortedRooms
                .map(room => {
                    const isFavorite = getFavoriteRooms().includes(room.id);
                    const today = new Date();
                    const roomEndDate = new Date(room.data_saida);
                    const roomStartDate = new Date(room.data_entrada);
                    const isAvailableToday = isToday(today) && today >= roomStartDate && today <= roomEndDate;
                    let nextAvailableDate = null;
                    if (!isAvailableToday) {
                        nextAvailableDate = today < roomStartDate ? roomStartDate : new Date(today.getTime());
                        // Format the next available date
                        nextAvailableDate = format(nextAvailableDate, 'dd/MM/yyyy');
                    }
                    
                    return (
                    <div key={room.id} className="projcard projcard-blue" onClick={() => navigate(`/room/${room.id}`)}>
                        <div className="projcard-innerbox">
                        <img className="projcard-img" src={room.imagem1} alt={`Room ${room.id}`} />
                        <div className="projcard-textbox">
                            <div className="projcard-title">{room.description}</div>
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
                    );
                })
                ) : (
                <div> </div>
                )}
            </div>
            </div>
        </div>
        
    );
}

export default RoomsListPage;