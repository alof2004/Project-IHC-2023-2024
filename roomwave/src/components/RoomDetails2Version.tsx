import React, { useState } from 'react';
import '../css/RoomDetails2Version.css'; // Importando o arquivo CSS
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import CarouselRoom from './CarouselRoom';


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
    const [room, setRoom] = useState<Room | undefined>(undefined);
    const defaultImage = '../../src/images/default.jpg'; // Replace 'path_to_default_image' with the actual path to your default image


    
    
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
            <div>
                <CarouselRoom />
            </div>
        </div>
    </div>
    </>
);
};

export default RoomDetailsSecond;
