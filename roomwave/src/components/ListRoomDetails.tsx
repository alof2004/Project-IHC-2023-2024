import React, { useEffect, useState } from 'react';
import roomsData from './rooms.json'; // Verifique o caminho do arquivo conforme necessário
import '../css/RoomDetails2Version.css';

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

const ListRoomDetails = ({ id }: { id: number }) => {
    const [room, setRoom] = useState<Room | null>(null);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                // Aqui, usamos uma função de filtragem para encontrar o quarto com o ID fornecido
                const foundRoom = roomsData.find(room => room.id === id);
                setRoom(foundRoom || null);
            } catch (error) {
                console.error('Erro ao carregar os detalhes do quarto:', error);
            }
        };

        fetchRoomDetails();
    }, [id]);

    if (!room) {
        return <p className="wrapper">Nenhum quarto encontrado com o ID fornecido.</p>;
    }

    return (
        <><div className="divider"></div><>
        <div className="wrapper_separator">
            <div className="wrapper room-card">
            <h1>Mobilía:</h1>
                <ul>
                    <div className="group">
                        {room.mobilia.slice(0, 5).map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </div>
                    <div className="group">
                        {room.mobilia.slice(5).map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </div>
                </ul>
            </div>
            <div className="wrapper room-card">
            <h1>Equipamentos disponíveis:</h1>
            <ul>
                <div className="group">
                    {room.Equipamento_disponivel.slice(0, 5).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </div>
                <div className="group">
                    {room.Equipamento_disponivel.slice(5).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </div>
            </ul>
            </div>
        </div>
        <div className="divider"></div>
        <div className="wrapper_separator">
            <div className="wrapper room-card">
            <h1>Renda Inclui:</h1>
                <ul className='ul_top'>
                    <div className="group">
                        {room.Renda_inclui.slice(0, 5).map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </div>
                    <div className="group">
                        {room.Renda_inclui.slice(5).map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </div>
                </ul>
            </div>
            <div className="wrapper room-card">
            <ul className='ul_top'>
                <div className="group">
                <h1 >Géneros permitidos:</h1>
                    {room.Pessoas_permitidas.slice(0, 3).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </div>
                <div className="group">
                    <h1>Permissão de animais:</h1>
                    <li>{room.Animais}</li>
                </div>
            </ul>
            <ul className='ul_top'>
                <div className="group">
                    <h1>Locais disponiveis:</h1>
                    {room.Locais_proximos.slice(0, 3).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </div>
                <div className="group">
                    <h1>Permissão de fumadores:</h1>
                    <li>{room.Fumadores}</li>
                </div>
            </ul>
            </div>
        </div>
        </></>
    );
};

export default ListRoomDetails;
