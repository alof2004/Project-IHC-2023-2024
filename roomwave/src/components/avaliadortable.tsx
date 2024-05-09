import React, { useEffect, useState } from 'react';
import roomsData from './rooms.json';
import { useNavigate } from 'react-router-dom';

const AvaliadorTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(roomsData);
  const [evaluatedRooms, setEvaluatedRooms] = useState<number[]>([]);

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
    // Remove the room from the state
    const updatedRooms = rooms.filter(room => room.id !== roomId);
    setRooms(updatedRooms);
  };

  useEffect(() => {
    // Retrieve evaluated rooms from local storage
    const avaliados = JSON.parse(localStorage.getItem('avaliados') || '[]');
    setEvaluatedRooms(avaliados.map((room: { id: any; }) => room.id)); // Convert to an array of IDs for easier comparison
  }, []);
  

  const roomsAwaitingEvaluation = rooms.filter(room => !room.Avaliacao);

  return (
    <div className="table-container">
      <style>
        {`
          .table {
            width: 85%;
            margin-left: auto;
            margin-right: auto;
            margin-top: 50px;
          }

          .table-header,
          .table-row {
            display: flex;
          }

          .table-header div,
          .table-row div {
            flex: 1;
            padding: 11px;
            border: 1px solid #ddd;
            display: flex;
            align-items: center; /* Centralize vertically */
            justify-content: center; /* Centralize horizontally */
            font-size: 25px;
            text-align: center;
          }

          .table-header {
            background-color: #f2f2f2;
          }

          .table-row:nth-child(even) {
            background-color: #f2f2f2;
          }

          .options {
            display: flex;
            justify-content: space-around;
          }

          .options button {
            border: 2px solid black;
            margin: 5px;
            border-radius: 10px;
            cursor: pointer;
            background-color: transparent;
          }

          .options button img {
            width: 30px;
            height: 30px;
          }

          .label {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 18px;
            color: white;
          }

          .verde {
            background-color: green;
          }

          .vermelho {
            background-color: red;
          }

          .imgIcon{
            margin-bottom: 5px;
          }

          .pagination {
            display: flex;
            justify-content: center;
            margin-top: 100px;
            
          }

          .pagination button {
            margin: 0 30px; /* Adjust this value to set the space between buttons */
            font-size: 30px;
          }

        `}
      </style>
      <div className="favorites-container-1">
                <div className='titulos gradient-effect-1'>
                    <h2>Quartos à espera de avaliação</h2>
                    <h5>Existem {roomsAwaitingEvaluation.length} a aguardar avaliação</h5>
                </div>
      </div>
      <div className="table">
        <div className="table-header">
          <div>ID</div>
          <div>Nome</div>
          <div>Localização</div>
          <div>Distrito</div>
          <div>Número de telefone</div>
          <div>Avaliado</div>
          <div>Opções</div>
        </div>
        <div className="table-body">
          {rooms.slice(currentPage * 10, (currentPage + 1) * 10).map(item => (
            <div className="table-row" key={item.id}>
              <div>{item.id}</div>
              <div>{item.Proprietaria}</div>
              <div>{item.localizacao}</div>
              <div>{item.cidade}</div>
              <div>{item.telefone}</div>
              <div>
              <span className={`label ${evaluatedRooms.includes(item.id) || item.Avaliado==="Sim" ? 'verde' : 'vermelho'}`}>
                {evaluatedRooms.includes(item.id)? 'Avaliado' : 'Não avaliado'}
              </span>
              </div>
              <div className="options">
                <button onClick={() => handleRoom(item.id)}><img className="imgIcon" style={{width:"30px", height:"30px"}} src="../../src/images/olho.png" alt="Ícone Ver"/></button>
                <button onClick={() => handleAvaliarClick(item.id)}><img className="imgIcon" style={{width:"30px", height:"30px"}}src="../../src/images/lapis.png" alt="Ícone Editar"/></button>
                <button onClick={() => handleDeleteClick(item.id)}><img className="imgIcon" style={{width:"30px", height:"30px"}}src="../../src/images/lixo.png" alt="Ícone Eliminar"/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>Anterior</button>
        <button onClick={handleNextPage} disabled={(currentPage + 1) * 5 >= rooms.length}>Próximo</button>
      </div>
    </div>
  );
};

export default AvaliadorTable;
