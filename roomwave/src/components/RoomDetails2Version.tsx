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
