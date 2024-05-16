import '../css/RoomDetails2Version.css'; 
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import details from './rooms.json';
import './rating.json';
import NavBar from './NavBar';
import { SetStateAction, useEffect, useState } from 'react';
import Map from './Map';
import {useParams} from 'react-router-dom'; // Import useNavigate
import { useLocation, useNavigate } from 'react-router-dom';



import Footer from './footer';
import HeartIcon from './HeartIconDetails';
import Button from '@mui/material/Button';
import Button1 from './button';
import Carousel2 from './Carousel2';
import StarRatingRoom from './StarRatingRoom';
import ListRoomDetails from './ListRoomDetails';
import Opinions_carrousel from './opinions_carrousel';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Avaliar from './AvaliadoDetails';
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
    telefone: number;
    Rating?: number[]
}

const RoomDetailsSecond: React.FC = () => {
    const { ID } = useParams();
    const [room, setRoom] = useState<Room | undefined>(undefined);
    const defaultImage = '../../src/images/default.jpg'; // Replace 'path_to_default_image' with the actual path to your default image
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    useEffect(() => {
        if (ID && parseInt(ID) < 100) {
            const foundRoom = details.find((room) => room.id.toString() === ID);
            setRoom(foundRoom);
        } else {
            const rooms = localStorage.getItem('roomsData');
            const parsedRooms = JSON.parse(rooms || '[]');
            const foundRoom = parsedRooms.find((room: Room) => room.id.toString() === ID);
            setRoom(foundRoom);
        }
    }, [ID]);

    const userData = localStorage.getItem('userData');
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.setItem('redirectPath', location.pathname);
        console.log(location.pathname);
    }

    const saveVisitedRoom = (roomId: string) => {
        const visitedRooms = JSON.parse(localStorage.getItem('visitedRooms') || '[]');
        if (!visitedRooms.includes(roomId)) {
            visitedRooms.push(roomId);
            localStorage.setItem('visitedRooms', JSON.stringify(visitedRooms));
        }
    };

    const isAvaliador = userData && JSON.parse(userData).type === 'avaliador';

    useEffect(() => {
        if (ID) {
            saveVisitedRoom(ID);
        }
    }, [ID]);

    console.log(ID);
    if (!room) {
        console.log(room);
        return <div>Loading...</div>; // or handle the case when room is not found
    }

    const isRated = (roomId: number) => {
        const storedRatings = JSON.parse(localStorage.getItem('avaliados') ?? '[]');
        const rating = storedRatings.find((rating: { id: number; avaliacao: number; }) => rating.id === roomId);
        console.log(rating);
        return rating ? rating.avaliacao : null;
    };

    const getRating = (roomId: number): number => {
        const room = details.find((room) => room.id === roomId);
        let rating = null;
        if (room && room.Avaliado === 'Sim') {
            rating = room.Avaliacao;
        } else {
            rating = isRated(parseInt(ID || '', 10));
        }
        return rating;
    };

    const handleBack = () => {
        navigate(-1);
    };

    const category = ["Funcionários", "Conforto", "Wifi", "Comodidade", "Relação Qualidade/Preço", "Limpeza", "Localização", "Instalações", "Serviços"];
    function getOpinionPercentage(categoryName: string) {
        const opinionPercentages: {[key: string]: number} = {
            "Funcionários": Math.floor(Math.random() * 101),
            "Conforto": Math.floor(Math.random() * 101),
            "Wifi": Math.floor(Math.random() * 101),
            "Comodidade": Math.floor(Math.random() * 101),
            "Relação Qualidade/Preço": Math.floor(Math.random() * 101),
            "Limpeza": Math.floor(Math.random() * 101),
            "Localização": Math.floor(Math.random() * 101),
            "Instalações": Math.floor(Math.random() * 101),
            "Serviços": Math.floor(Math.random() * 101)
        };
    
        return opinionPercentages[categoryName] || 0;
    }

    const rating = getRating(parseInt(ID || '', 10));

    return (
        <>
            <NavBar />
            <div className="page-container">
                <div className="content">
                    <div className="return-button-container">
                        <button onClick={handleBack}>
                            <img src='../../src/images/return.png' className='return-button' alt="return" />
                        </button>
                    </div>
                    <div className='all_info'>
                        <div className='all_titles'>
                            <div className='proprietaria_localizacao'>
                                <div className='Quarto1'>
                                    <h1>
                                        Quarto de {''}
                                        <span style={{ color: "#FF7A41" }}>{room?.Proprietaria || ''}</span>
                                    </h1>
                                </div>
                                <div className='Quarto2'>
                                    {userData ? (
                                        <><div className='telefone_contacto_butoes_avaliar'>
                                            <img src="../../src/images/telefone_icon.png" width='80px' height='50px' alt="telefone icon" />
                                            <span>Telefone: {room.telefone}</span>
                                        </div><div className='icon_avaliar'>
                                                {isAvaliador && (
                                                    <Button variant="contained" onClick={() => navigate(`/avaliar/${ID}`)}>AVALIAR QUARTO</Button>
                                                )}
                                            </div></>
                                    ) : (
                                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <div onClick={handleClick} className='senhorio_contacto_butoes_avaliar'>
                                                <img src="../../src/images/telefone_icon.png" width='70px' height='40px' alt="telefone icon" />
                                                <span>Faça login para contactar o senhorio</span>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                            <h2>
                                Localização: {''}
                                <span>{room?.localizacao}, {room?.cidade}</span>
                            </h2>
                            <div className='rating_box'>
                                <h2>
                                    Avaliação atribuida pelo RoomWave: {''}
                                </h2>
                                <div className='rating_box_margin'>
                                    <StarRatingRoom rating={rating} />
                                </div>
                            </div>
                            {rating > 0 && (
                                <button className="button-55" role="button" onClick={handleOpen}>Ver detalhes de Avaliaçao</button>
                            )}
                        </div>

                        <div className='contacto_butoes_avaliar'>
                            <Button1 />
                            <div className="icons_all" style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <div className='hearticon_contacto_butoes_avaliar' style={{ marginRight: '10px', marginTop: "10px" }}>
                                    <HeartIcon roomId={parseInt(ID ?? '')} isFavorite={false} />
                                </div>
                                <div className='shareicon_contacto_butoes_avaliar' style={{ marginLeft: '10px' }}>
                                    <img src='../../src/images/share.png' alt="share" style={{ width: '100%', height: '100%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Carousel2 room={{
                        imagem1: room?.imagem1 || defaultImage,
                        imagem2: room?.imagem2 || defaultImage,
                        imagem3: room?.imagem3 || defaultImage,
                        imagem4: room?.imagem4 || defaultImage
                    }} />
                    <h1 style={{ fontSize: "50px", marginTop: "3%", marginLeft: "5%" }}> {room?.price}€ + despesas {room?.gastos ?? ''}</h1>
                    <h2 style={{ fontSize: "50px", marginTop: "3%", marginLeft: "5%" }}>Informações sobre o quarto</h2>
                    <p style={{ fontSize: "35px", marginBottom: "3%", marginLeft: "5%", marginRight: "5%" }}>
                        A habitação dispõem de uma área de {room.area}m2 e é rodeada por um ambiente {room.Ambiente}. Inclui uma {room.mobilia.join(", ").toLowerCase()} e, o mais importante, uma cama {room.Cama.toLowerCase()}. <br />
                        Ambiente {room.Ambiente}. A cozinha é {room.Cozinha.toLowerCase()}, a casa tem disponiveis {room.casas_de_banho} casas de banho.<br />
                        Na sua proximidade encontra vários edifícios como: {room.Locais_proximos.join(", ")}.
                        Autocarros {room.Transportes}. {room.Descrição_Proprietaria}<br />
                        Pessoas do género(s) {room.Pessoas_permitidas[0]} são permitidas, bem como {room.Pessoas_permitidas[1]}. Animais são {room.Animais} e o acesso a fumadores é {room.Fumadores}.<br />
                        As despesas estão {room.gastos}<br />
                    </p>
                </div>
                <ListRoomDetails id={parseInt(ID || '', 10)} />
                <div className='mapcontainer'>
                    <h2 style={{ fontSize: "60px", marginBottom: "50px", marginLeft: "50px" }}>Localização:</h2>
                    <Map />
                </div>
                <h2 style={{ fontSize: "40px", marginLeft: "50px",fontWeight:'bold' }}>Comentários de clientes</h2>
                <div className='Comentarios'>
                    <ul>
                        <div className="group">
                            {category.slice(0, 3).map((item, index) => (
                                <div key={index}>
                                    <li>{item}</li>
                                    <progress value={getOpinionPercentage(item)} max="100" style={{ "--value": getOpinionPercentage(item), "--max": "100" } as any}></progress>
                                </div>
                            ))}
                        </div>
                        <div className="group">
                            {category.slice(4, 7).map((item, index) => (
                                <div key={index}>
                                    <li>{item}</li>
                                    <progress value={getOpinionPercentage(item)} max="100" style={{ "--value": getOpinionPercentage(item), "--max": "100" } as any}></progress>
                                </div>
                            ))}
                        </div>
                        <div className="group">
                            {category.slice(8, 10).map((item, index) => (
                                <div key={index}>
                                    <li className='marker1'>{item}</li>
                                    <progress value={getOpinionPercentage(item)} max="100" style={{ "--value": getOpinionPercentage(item), "--max": "100" } as any}></progress>
                                </div>
                            ))}
                        </div>
                    </ul>
                </div>
        <div className='client_opinions'>
            <h2 style={{fontSize:"40px", marginLeft:"50px",fontWeight:'bold'}}>Veja aqui a opinião de outros clientes:</h2>
            <Opinions_carrousel />
        </div>
            </div>
            <Footer />

            {/* Modal Implementation */}
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '90vw', // Adjusted to use viewport width
                    maxHeight: '85vh', // Adjusted to use viewport height
                    overflowY: 'auto', // Allows scrolling if content exceeds the modal height
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '12px', // Optional: Adds rounded corners to the modal
                }}>
                            <IconButton
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                color: 'red',
                            }}
                            
                        >
                        <CloseIcon />
                        </IconButton>
                    <Avaliar />
                </Box>
            </Modal>
        </>
    );
};

export default RoomDetailsSecond;
