import React, { useState } from 'react';
import '../css/RoomDetails2Version.css'; // Importando o arquivo CSS
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Carousel from './RoomCarousel';


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

   const images = [
    '../../src/images/quarto1.jpg',
    '../../src/images/quarto1_2.jpg',
    '../../src/images/quarto1_3.jpg',
    '../../src/images/quarto1_4.jpg'
  ];

const RoomDetailsSecond: React.FC = () => {
    const [room, setRoom] = useState<Room | undefined>(undefined);

    
return (
    <>
    <NavBar />
    <div className="page-container">
        <div className="content">
            <div>
                <Link to={`../../rooms/${room?.cidade}`}>
                    <img src='../../src/images/return.png' className='return-button' alt="return" />
                </Link>
                <Carousel images={images} />
            </div>
        </div>
    </div>
    </>
);
};

export default RoomDetailsSecond;
