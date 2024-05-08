import React, { useState } from 'react';
import rooms from './rooms.json';

const AvaliadorTable = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

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
        `}
      </style>
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
          {rooms.slice(currentPage * 5, (currentPage + 1) * 5).map(item => (
            <div className="table-row" key={item.id}>
              <div>{item.id}</div>
              <div>{item.Proprietaria}</div>
              <div>{item.localizacao}</div>
              <div>{item.cidade}</div>
              <div>{item.telefone}</div>
              <div>
                <span className={`label ${item.Avaliacao ? 'verde' : 'vermelho'}`}>
                  {item.Avaliacao ? 'Avaliado' : 'Não avaliado'}
                </span>
              </div>
              <div className="options">
                <button><img className="imgIcon" style={{width:"30px", height:"30px"}} src="../../src/images/olho.png" alt="Ícone Ver"/></button>
                <button><img className="imgIcon" style={{width:"30px", height:"30px"}}src="../../src/images/lapis.png" alt="Ícone Editar"/></button>
                <button><img className="imgIcon" style={{width:"30px", height:"30px"}}src="../../src/images/lixo.png" alt="Ícone Eliminar"/></button>
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
