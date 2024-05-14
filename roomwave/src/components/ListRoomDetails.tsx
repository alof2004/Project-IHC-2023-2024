import React, { useEffect, useState } from 'react';
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




const ListRoomDetails= ({ id }: { id: number }) => {
    const [room, setRoom] = useState<Room | null>(null);

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await fetch(`/rooms.json`);
                const data: Room[] = await response.json();
                const foundRoom = data.find(room => room.id === id);
                setRoom(foundRoom || null);
            } catch (error) {
                console.error('Erro ao carregar os detalhes do quarto:', error);
            }
        };

        fetchRoomDetails();
    }, [id]);
  
    if (!room) {
      return <p>Nenhum quarto encontrado com o ID fornecido.</p>;
    }

  return (
    <div className="room-card">
      <h2>{room.localizacao}</h2>
      <p>Cidade: {room.cidade}, País: {room.país}</p>
      <p>Descrição: {room.description}</p>
      <p>Preço: {room.price}</p>
      <p>Mobília:</p>
      <ul>
        {room.mobilia.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p>Equipamento Disponível:</p>
      <ul>
        {room.Equipamento_disponivel.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {/* Adicione outras informações conforme necessário */}
    </div>
  );
};


export default ListRoomDetails;
