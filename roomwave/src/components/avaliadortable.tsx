import React, { useState } from 'react';

const data = [
  { id: 1, nome: 'Item 1', localizacao: 'Localização 1', distrito: 'Distrito 1', telefone: '123456789', avaliado: true },
  { id: 2, nome: 'Item 2', localizacao: 'Localização 2', distrito: 'Distrito 2', telefone: '987654321', avaliado: false },
  // Adicione mais dados conforme necessário
];

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
            align-items: center; /* Centraliza conteúdo verticalmente */
            font-size: 25px;
            text-align: center; /* Centraliza texto horizontalmente */
          }

          .table-header {
            background-color: #f2f2f2;
          }

          .table-row:nth-child(even) {
            background-color: #f2f2f2;
          }

          .options {
            display: flex;
            justify-content: space-around; /* Centraliza os botões horizontalmente */
          }

          .options button {
            border:1px solid black;
            cursor: pointer;
            background-color:transparent;
          }

          .options button img {
            width: 30px;
            height: 0px; /* Altura definida como 0px para ocultar os ícones */
          }

          .label {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 20px; /* Borda arredondada */
            color: white;
            font-size: 18px;
          }

          .verde {
            background-color: green;
          }

          .vermelho {
            background-color: red;
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
          {data.slice(currentPage * 5, (currentPage + 1) * 5).map(item => (
            <div className="table-row" key={item.id}>
              <div>{item.id}</div>
              <div>{item.nome}</div>
              <div>{item.localizacao}</div>
              <div>{item.distrito}</div>
              <div>{item.telefone}</div>
              <div>
                <span className={`label ${item.avaliado ? 'verde' : 'vermelho'}`}>
                  {item.avaliado ? 'Avaliado' : 'Não avaliado'}
                </span>
              </div>
              <div className="options">
                <button><img style={{width:"30px", height:"30px"}} src="../../src/images/olho.png" alt="Ícone Ver"/></button>
                <button><img style={{width:"30px", height:"30px"}}src="../../src/images/lapis.png" alt="Ícone Editar"/></button>
                <button><img style={{width:"30px", height:"30px"}}src="../../src/images/lixo.png" alt="Ícone Eliminar"/></button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>Anterior</button>
        <button onClick={handleNextPage} disabled={(currentPage + 1) * 5 >= data.length}>Próximo</button>
      </div>
    </div>
  );
};

export default AvaliadorTable;
