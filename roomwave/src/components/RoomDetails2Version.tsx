import '../css/RoomDetails2Version.css'; 
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import details from './rooms.json';
import NavBar from './NavBar';
import { SetStateAction, useEffect, useState } from 'react';
import Map from './Map';
import {useParams } from 'react-router-dom'; // Import useNavigate
import { useLocation, useNavigate } from 'react-router-dom';


import Footer from './footer';
import TemplateDemo from './Table_location';
import HeartIcon from './HeartIconDetails';
import Button from '@mui/material/Button';
import Button1 from './button';
import Carousel2 from './Carousel2';
import StarRating from './StarRating';


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
   }

const RoomDetailsSecond: React.FC = () => {
    const { ID } = useParams();
    const [room, setRoom] = useState<Room | undefined>(undefined);
    const defaultImage = '../../src/images/default.jpg'; // Replace 'path_to_default_image' with the actual path to your default image

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
        console.log(room)
        return <div>Loading...</div>; // or handle the case when room is not found
    }

    const isRated = (roomId: number) => {
        const storedRatings = JSON.parse(localStorage.getItem('avaliados')?? '') || [];
        const rating = storedRatings.find((rating: { id: number; avaliacao: number; }) => rating.id === roomId);
        console.log(rating)
        return rating? rating.avaliacao : null;
    };
    const rating = isRated(parseInt(ID || ''));

return (
    <>
    <NavBar />
    <div className="page-container">
        <div className="content">
            <div className="return-button-container">
                    <Link to={`../../rooms/${room?.cidade}`}>
                        <img src='../../src/images/return.png' className='return-button' alt="return" />
                    </Link>
                </div>
            <div className='all_info'> 
                <div className='all_titles'> 
                    <div className='proprietaria_localizacao'>
                        <h1>
                            Quarto de {''} 
                            <span style={{ color: "#FF7A41" }}>{room?.Proprietaria || ''}</span>
                        </h1>
                        <h2>
                            Localização: {''} 
                            <span>{room?.localizacao}, {room?.cidade}</span>
                        </h2>
                        <h2>
                            Avaliação atribuida pelo nosso certificador: {''} 
                            <StarRating rating={rating} />
                        </h2>
                    </div>
                </div>

                <div className='contacto_butoes_avaliar'>  
                    {userData ? (
                        <div className='telefone_contacto_butoes_avaliar'>
                            <img src="../../src/images/telefone_icon.png" width='80px' height='50px' alt="telefone icon" />
                            <span>Telefone: {room.telefone}</span>
                        </div>                    
                        ) : (
                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div onClick={handleClick} className='senhorio_contacto_butoes_avaliar'>
                            <img src="../../src/images/telefone_icon.png" width='80px' height='50px' alt="telefone icon" />
                            <span>Faça login para contactar o senhorio</span>
                            </div>  
                        </Link>
                        )}
                    <Button1 />
                    <div className="icons_all" style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                        <div className='hearticon_contacto_butoes_avaliar' style={{ marginRight: '10px', marginTop:"10px" }}>
                            <HeartIcon roomId={parseInt(ID?? '')} isFavorite={false} />
                        </div>
                        <div className='shareicon_contacto_butoes_avaliar' style={{ marginLeft: '10px' }}>
                            <img src='../../src/images/share.png' alt="share" style={{ width: '100%', height: '100%' }} />
                        </div>
                        {isAvaliador && (
                        <Button style={{width:"400px", height:"100px", fontSize:"40px", marginTop:"50px", marginLeft:"30px", color:"white", backgroundColor:"#76b476"}} variant="contained" onClick={() => navigate(`/avaliar/${ID}`)}>AVALIAR QUARTO</Button>
                        )}
                    </div>
                </div>
            </div>

            <div className='img-container'>
                <Carousel2 room={{ 
                    imagem1: room?.imagem1 || defaultImage,
                    imagem2: room?.imagem2 || defaultImage,
                    imagem3: room?.imagem3 || defaultImage,
                    imagem4: room?.imagem4 || defaultImage,
                }} />
            </div>
        </div>
    </div>
    <Footer />
    </>
);
};

export default RoomDetailsSecond;
