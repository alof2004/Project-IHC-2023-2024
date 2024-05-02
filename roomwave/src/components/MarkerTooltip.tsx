import React from 'react';
import '../css/MarkerTooltip.css'; // Assuming you have a CSS file for styling

interface RoomDetails {
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

interface MarkerTooltipProps {
  room: RoomDetails;
}

const MarkerTooltip: React.FC<MarkerTooltipProps> = ({ room }) => {
  return (
    <div className="marker-tooltip">
      <h3>{room.description}</h3>
      <p>{room.Descrição_Proprietaria}</p>
    </div>
  );
};

export default MarkerTooltip;
