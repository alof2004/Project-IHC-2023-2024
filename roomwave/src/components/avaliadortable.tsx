import React, { useEffect, useState } from 'react';
import roomsData from './rooms.json';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AvaliadorTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(roomsData);
  const [evaluatedRooms, setEvaluatedRooms] = useState<number[]>([]);
  const roomsJSON = localStorage.getItem('roomsData');
  const roomsJSONParsed = roomsJSON ? JSON.parse(roomsJSON) : [];
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [showUnevaluated, setShowUnevaluated] = useState<boolean>(false);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleAvaliarClick = (roomId: number) => {
    navigate(`/avaliar/${roomId}`);
  };

  const handleRoom = (roomId: number) => {
    navigate(`/room/${roomId}`);
  };

  const handleDeleteClick = (roomId: number) => {
    const updatedRooms = rooms.filter(room => room.id !== roomId);
    setRooms(updatedRooms);
  };

  useEffect(() => {
    const avaliados = JSON.parse(localStorage.getItem('avaliados') || '[]');
    const evaluatedRoomIds = avaliados.map((room: { id: any; }) => Number(room.id));
    const roomsJSON = localStorage.getItem('roomsData');
    const roomsJSONParsed = roomsJSON ? JSON.parse(roomsJSON) : [];
    const mergedRooms = [...roomsData, ...roomsJSONParsed];
    setRooms(mergedRooms);

    const evaluatedRoomsFromJSON = mergedRooms.filter(room => room.Avaliado === "Sim");
    const evaluatedRoomIdsFromJSON = evaluatedRoomsFromJSON.map(room => Number(room.id));
    const combinedEvaluatedRoomIds = [...evaluatedRoomIds, ...evaluatedRoomIdsFromJSON];
    setEvaluatedRooms(combinedEvaluatedRoomIds);
  }, []);

  const toggleShowUnevaluated = () => {
    setShowUnevaluated(!showUnevaluated);
  };

  const unevaluatedRooms = rooms.filter(room => !evaluatedRooms.includes(Number(room.id)));
  const combinedRooms = showUnevaluated ? unevaluatedRooms : rooms;
  const filteredRooms = selectedDistrict ? combinedRooms.filter(room => room.cidade === selectedDistrict) : combinedRooms;
  const roomsAwaitingEvaluation = rooms.filter(room => !evaluatedRooms.includes(Number(room.id)));

  const getRating = (roomId: number) => {
    const avaliados = JSON.parse(localStorage.getItem('avaliados') || '[]');
    const room = avaliados.find((room: { id: number; }) => room.id === roomId);
    if (room) {
      return room.avaliacao;
    } else {
      const roomData = roomsData.find(room => room.id === roomId);
      return roomData ? roomData.Avaliacao : null;
    }
  };

  const districts = Array.from(new Set(combinedRooms.map(room => room.cidade))).sort();
  const totalFilteredRooms = filteredRooms.length;
  const totalPages = Math.ceil(totalFilteredRooms / 10);

  return (
    <div className="table-container">
      <style>
        {`
          .table-container {
            width: 100%;
            overflow-x: auto;
            margin-top: 20px;
          }
          .table {
            width: 85%;
            margin: 20px auto;
          }
          
          .table-header, .table-row {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
          }
          .table-header div, .table-row div {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            text-align: center;
            font-size: 2rem;
            vertical-align: middle;
          }
          .table-header {
            background-color: #f2f2f2;
          }
          .table-row:nth-child(even) {
            background-color: #f9f9f9;
          }

          .sort{
            height: 90px !important;
            font-size: 1.4rem;
          }

          .label {
            display: inline-block;
            padding: 5px 10px;
            margin-top: 20px;
            border-radius: 5px;
            color: #fff;
            font-size: 2rem;
          }
          .verde {
            background-color: green;
            box-shadow: 4px 4px 0px darkgreen;
          }

          .vermelho {
            background-color: red;
            box-shadow: 4px 4px 0px darkred;
          }
          .pagination {
            display: flex;
            justify-content: center;
            margin-top: 20px;
          }
          .pagination button {
            margin: 0 20px;
            padding: 10px 15px;
            font-size: 2rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .button-33 {
            background-color: #c2fbd7;
            color: green;
          }
          .button-34 {
            background-color: #f0b2b0;
            color: red;
          }
          .cidades {
            background-color: #FF7A41;
            width: 20%;
            height: 90px;
            color: white;
            font-size: 1.3rem;
            font-weight: bold;
            border: none;
            margin-bottom: 10px;
          }
          @media (max-width: 768px) {
            .table-header div, .table-row div {
              font-size: 0.8rem;
              padding: 8px;
            }
            .label {
              font-size: 0.8rem;
            }
          }
          .options button {
            margin-top: 08px;
            background-color: transparent;
            border: none;
          }
          .button-33:hover {
            box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
            transform: scale(1.05) rotate(-1deg);
            transition: all 0.3s;
          }

          .button-34:hover {
            box-shadow: rgba(109, 34, 33, 0.35) 0 -25px 18px -14px inset,rgba(109, 34, 33, 0.35) 0 1px 2px,rgba(109, 34, 33, 0.35) 0 2px 4px,rgba(109, 34, 33, 0.35) 0 4px 8px,rgba(109, 34, 33, 0.35) 0 8px 16px,rgba(109, 34, 33, 0.35) 0 16px 32px;
            transform: scale(1.05) rotate(+2deg);
            transition: all 0.3s;
          }
        `}
      </style>
      <div className="favorites-container-1">
        <div className="titulos gradient-effect-1">
          <h2>Quartos à espera de avaliação</h2>
          <h5>Existem {roomsAwaitingEvaluation.length} a aguardar avaliação</h5>
        </div>
      </div>
      <div className="table">
        <select className="cidades" onChange={(e) => setSelectedDistrict(e.target.value)} defaultValue={''}>
          <option value={''}>Todos os distritos</option>
          {districts.map((district, index) => (
            <option key={index} value={district}>{district}</option>
          ))}
        </select>
        <button
          className={`button-79 sort ${showUnevaluated ? 'toggled' : ''}`}
          onClick={toggleShowUnevaluated}
        >
          {showUnevaluated ? 'Mostrar todos os quartos' : 'Mostrar quartos não avaliados'}
        </button>
        <div className="table-header">
          <div>ID</div>
          <div>Nome</div>
          <div>Localização</div>
          <div>Distrito</div>
          <div>Número de telefone</div>
          <div>Avaliado</div>
          <div>Avaliação</div>
          <div>Opções</div>
        </div>
        <div className="table-body">
          {filteredRooms.slice(currentPage * 10, (currentPage + 1) * 10).map(item => (
            <div className="table-row" key={item.id}>
              <div className="ID-table">{item.id}</div>
              <div>{item.Proprietaria}</div>
              <div>{item.localizacao}</div>
              <div>{item.cidade}</div>
              <div>{item.telefone}</div>
              <div>
                <span className={`label ${evaluatedRooms.includes(Number(item.id)) || item.Avaliado === "Sim" ? 'verde' : 'vermelho'}`}>
                  {evaluatedRooms.includes(Number(item.id)) || item.Avaliado === "Sim" ? 'Avaliado' : 'Não avaliado'}
                </span>
              </div>
              <div>{evaluatedRooms.includes(Number(item.id)) ? getRating(item.id) || 'N/A' : 'N/A'}</div>
              <div className="options">
                <button onClick={() => handleRoom(item.id)}>
                  <IconButton aria-label="visibility" size='large'>
                    <VisibilityIcon style={{ color: 'black' }} fontSize='large' />
                  </IconButton>
                </button>
                <button onClick={() => handleAvaliarClick(item.id)} disabled={evaluatedRooms.includes(Number(item.id))}>
                <IconButton aria-label="edit" style={{ display: evaluatedRooms.includes(Number(item.id)) ? 'none' : '' }}>
                    <EditIcon style={{ color: 'black' }} fontSize='large' />
                  </IconButton>
                </button>
                <button onClick={() => handleDeleteClick(item.id)}>
                  <IconButton aria-label="delete" size='large'>
                    <DeleteIcon style={{ color: 'black' }} fontSize='large' />
                  </IconButton>
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button className="button-34" onClick={handlePreviousPage} disabled={currentPage === 0}>
            Anterior
          </button>
          <button className="button-33" onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvaliadorTable;
