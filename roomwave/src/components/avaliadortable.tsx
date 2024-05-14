import React, { useEffect, useState } from 'react';
import roomsData from './rooms.json';
import { useNavigate } from 'react-router-dom';

const AvaliadorTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(roomsData);
  const [evaluatedRooms, setEvaluatedRooms] = useState<number[]>([]);
  const roomsJSON = localStorage.getItem('roomsData');
  const roomsJSONParsed = roomsJSON ? JSON.parse(roomsJSON) : [];
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null); // Step 1: Add a state for selected district
  const [showUnevaluated, setShowUnevaluated] = useState<boolean>(false); // Step 1: Add state for showing unevaluated rooms

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
    // Extract the IDs from the array of objects
    const evaluatedRoomIds = avaliados.map((room: { id: any; }) => Number(room.id));
    // Retrieve rooms data from local storage
    const roomsJSON = localStorage.getItem('roomsData');
    const roomsJSONParsed = roomsJSON ? JSON.parse(roomsJSON) : [];
    // Merge the parsed rooms data with the initial roomsData
    const mergedRooms = [...roomsData, ...roomsJSONParsed];
    // Set the merged rooms data as the state
    setRooms(mergedRooms);
  
    // Add rooms that have "Sim" in the JSON to the evaluatedRooms array
    const evaluatedRoomsFromJSON = mergedRooms.filter(room => room.Avaliado === "Sim");
    const evaluatedRoomIdsFromJSON = evaluatedRoomsFromJSON.map(room => Number(room.id));
    // Combine the evaluated room IDs from local storage and JSON data
    const combinedEvaluatedRoomIds = [...evaluatedRoomIds, ...evaluatedRoomIdsFromJSON];
    setEvaluatedRooms(combinedEvaluatedRoomIds);
  
  }, []);
  
  // Filter rooms that have been evaluated
  const toggleShowUnevaluated = () => {
    setShowUnevaluated(!showUnevaluated);
  };
  const unevaluatedRooms = rooms.filter(room => !evaluatedRooms.includes(Number(room.id)));

  // Step 3: Update combinedRooms based on the showUnevaluated state
  const combinedRooms = showUnevaluated ? unevaluatedRooms : rooms;

  // Filter rooms by district
  const filteredRooms = selectedDistrict ? combinedRooms.filter(room => room.cidade === selectedDistrict) : combinedRooms;

  // Filter rooms that are awaiting evaluation
  const roomsAwaitingEvaluation = rooms.filter(room =>!evaluatedRooms.includes(Number(room.id)));
  console.log(selectedDistrict)

  // Update the combinedRooms calculation to use filteredRooms instead of rooms
  const getRating = (roomId: number) => {
    // Retrieve evaluated rooms from local storage
    const avaliados = JSON.parse(localStorage.getItem('avaliados') || '[]');
    // Find the room in avaliados array
    const room = avaliados.find((room: { id: number; }) => room.id === roomId);
    
    if (room) {
      // Return the rating from avaliados if the room is evaluated
      return room.avaliacao;
     } else {
        // Find the room in roomsData array
        const roomData = roomsData.find(room => room.id === roomId);
        // Return the rating from roomsData if found, otherwise return null or another appropriate value
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
            padding: 11px; /* Ensure this matches the padding in the body cells */
            border: 1px solid #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 25px; /* Ensure this matches the font size in the body cells */
            text-align: center;
          }
          
          /* Apply these styles to the header cells to match the body cells */
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
            font-size: 25px;
            color: white;
            width: '40%';
          }

          .verde {
            background-color: green;
            box-shadow: 
            -0px 5px 14px #537a43, /* First shadow */
            0px -5px 14px #537a43; /* Second shadow */            

          }

          .vermelho {
            background-color: red;
            box-shadow: 
            -0px 5px 14px #b45f5f, /* First shadow */
            0px -5px 14px #b45f5f; /* Second shadow */     
          }

          .imgIcon{
            margin-bottom: 5px;
          }

          .pagination {
            display: flex;
            justify-content: center;
            margin-top: 50px;
            
          }

          .pagination button {
            margin: 0 30px; /* Adjust this value to set the space between buttons */
            font-size: 30px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
          }

          .toggled {
            background-color: #FF7A41; /* Change this to the color you want */
            color:#FF7A49 #; /* Change this to the text color you want */
            border:none;
          }
          
          .cidades{
            background-color: #FF7A41; /* Change this to the color you want */
            width: 400px;
            height: 68px;
            color: white;
            font-size: 25px;
            font-weight: bold;
            border: none;
            margin-bottom: 40px;

          }
          .button-79{
            font-size: 25px;
            border: none;
            margin-bottom: 40px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
          }
          .button-33 {
            background-color: #c2fbd7;
            border-radius: 100px;
            box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
            color: green;
            cursor: pointer;
            display: inline-block;
            font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
            padding: 7px 20px;
            text-align: center;
            text-decoration: none;
            transition: all 250ms;
            border: 0;
            font-size: 16px;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
          }

          .button-33:hover {
            box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
            transform: scale(1.05) rotate(-1deg);
          }

          .button-34 {
            background-color: #F0B2B0;
            border-radius: 100px;
            box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
            color: red;
            cursor: pointer;
            display: inline-block;
            font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
            padding: 7px 20px;
            text-align: center;
            text-decoration: none;
            transition: all 250ms;
            border: 0;
            font-size: 16px;
            user-select: none;
            -webkit-user-select: none;
            touch-action: manipulation;
          }

          .button-34:hover {
            box-shadow: rgba(109, 34, 33, 0.35) 0 -25px 18px -14px inset,rgba(109, 34, 33, 0.35) 0 1px 2px,rgba(109, 34, 33, 0.35) 0 2px 4px,rgba(109, 34, 33, 0.35) 0 4px 8px,rgba(109, 34, 33, 0.35) 0 8px 16px,rgba(109, 34, 33, 0.35) 0 16px 32px;
            transform: scale(1.05) rotate(+2deg);
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
              <div>{item.id}</div>
              <div>{item.Proprietaria}</div>
              <div>{item.localizacao}</div>
              <div>{item.cidade}</div>
              <div>{item.telefone}</div>
              <div>
                <span className={`label ${evaluatedRooms.includes(Number(item.id)) || item.Avaliado === "Sim" ? 'verde' : 'vermelho'}`}>
                  {evaluatedRooms.includes(Number(item.id)) || item.Avaliado === "Sim" ? 'Avaliado' : 'Não avaliado'}
                </span>
              </div>
              {/* Render the rating */}
              <div>{evaluatedRooms.includes(Number(item.id)) ? getRating(item.id) || 'N/A' : 'N/A'}</div>
              <div className="options">
                <button onClick={() => handleRoom(item.id)}><img className="imgIcon" style={{ width: "30px", height: "30px" }} src="../../src/images/olho.png" alt="Ícone Ver" /></button>
                <button onClick={() => handleAvaliarClick(item.id)} disabled={evaluatedRooms.includes(Number(item.id))}><img className="imgIcon" style={{ width: "30px", height: "30px" }} src="../../src/images/lapis.png" alt="Ícone Editar" /></button>
                <button onClick={() => handleDeleteClick(item.id)}><img className="imgIcon" style={{ width: "30px", height: "30px" }} src="../../src/images/lixo.png" alt="Ícone Eliminar" /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button className='button-33' onClick={handlePreviousPage} disabled={currentPage === 0}>Anterior</button>
          
          <button  className='button-34' onClick={handleNextPage} disabled={currentPage + 1 >= totalPages}>Próximo</button>
        </div>
      </div>
    </div>
  );
};

export default AvaliadorTable;
