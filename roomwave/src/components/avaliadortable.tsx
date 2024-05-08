import React from 'react';
import '../css/avaliadortable.css';

const Avaliadortable: React.FC = () => {
  return (
    <div className="br-table" data-search="data-search" data-selection="data-selection" data-collapse="data-collapse" data-random="data-random">
      <div className="table-header">
        <div className="top-bar">
          <div className="table-title">Resultado da Pesquisa</div>
          <div className="actions-trigger text-nowrap">
            <button className="br-button circle" type="button" id="button-dropdown-density" title="Ver mais opções" data-toggle="dropdown" data-target="target01-98928" aria-label="Definir densidade da tabela" aria-haspopup="true" aria-live="polite">
              <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
            </button>
            <div className="br-list" id="target01-98928" role="menu" aria-labelledby="button-dropdown-density" hidden={true}>
              <button className="br-item" type="button" data-density="small" role="menuitem">Densidade alta</button>
              <span className="br-divider"></span>
              <button className="br-item" type="button" data-density="medium" role="menuitem">Densidade média</button>
              <span className="br-divider"></span>
              <button className="br-item" type="button" data-density="large" role="menuitem">Densidade baixa</button>
            </div>
          </div>
          <div className="search-trigger"></div>
        </div>
        <div className="search-bar">
          <div className="br-input">
            <label htmlFor="table-searchbox-98928">Buscar na tabela</label>
            <input id="table-searchbox-98928" type="search" placeholder="Buscar na tabela" aria-labelledby="button-input-search" aria-label="Buscar na tabela"/>
            <button className="br-button" type="button" aria-label="Buscar">
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
          <button className="br-button circle" type="button" data-dismiss="search" aria-label="Fechar busca">
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div className="selected-bar">
          <div className="info"><span className="count">0</span><span className="text">item selecionado</span></div>
          <div className="actions-trigger text-nowrap">
            <button className="br-button circle inverted" type="button" id="button-dropdown-selection" data-toggle="dropdown" data-target="target02-98928" aria-controls="target02-98928" aria-label="Ver mais opções de ação" aria-haspopup="true">
              <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
            </button>
            <div className="br-list" id="target02-98928" role="menu" aria-labelledby="button-dropdown-selection" hidden={true}>
              <button className="br-item" type="button" data-toggle="" role="menuitem">Ação 1</button>
              <span className="br-divider"></span>
              <button className="br-item" type="button" role="menuitem">Ação 2</button>
            </div>
          </div>
        </div>
      </div>
      <table>
        <caption>Título da Tabela</caption>
        <thead>
          <tr>
            <td className="column-collapse" scope="col" aria-hidden="true"></td>
            <th className="column-checkbox" scope="col">
              <div className="br-checkbox hidden-label">
                <input id="check-all-98928" name="check-all-98928" type="checkbox" aria-label="Selecionar tudo" data-parent="check-01-98928"/>
                <label htmlFor="check-all-98928">Selecionar todas as linhas</label>
              </div>
            </th>
            <th scope="col">Título coluna 1</th>
            <th scope="col">Título coluna 2</th>
            <th scope="col" className="text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <button className="br-button circle small" type="button" id="button-line-1-98928" aria-label="Expandir/Retrair Rótulo 01" data-toggle="collapse" data-target="collapse-1-4-98928" aria-describedby="collapse-1-4-98928">
                <i className="fas fa-chevron-down" aria-hidden="true"></i>
              </button>
            </td>
            <td>
              <div className="br-checkbox hidden-label">
                <input id="check-line-1-98928" name="check-line-1-98928" type="checkbox" aria-label="Selecionar linha 1" data-child="check-01-98928"/>
                <label htmlFor="check-line-1-98928">Selecionar linha 1</label>
              </div>
            </td>
            <td data-th="Título coluna 1">Linha 1 coluna 1</td>
            <td data-th="Título coluna 2">Linha 1 coluna 2</td>
            <td data-th="Título coluna 3" className="text-right">
              <button className="br-button circle secondary small" type="button" aria-label="Ícone ilustrativo">
                <i className="fas fa-eye" aria-hidden="true"></i>
              </button>
              <button className="br-button circle secondary small" type="button" aria-label="Ícone ilustrativo">
                <i className="fas fa-pen" aria-hidden="true"></i>
              </button>
              <button className="br-button circle primary small" type="button" aria-label="Ícone ilustrativo">
                <i className="fas fa-trash" aria-hidden="true"></i>
              </button>
            </td>
          </tr>
          <tr className="collapse">
            <td id="collapse-1-4-98928" aria-hidden="true" hidden={true} colSpan={6}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies aliquet lacinia. Vestibulum in interdum eros. Donec vel tempus diam. Aenean pulvinar mattis nisi in laoreet. Integer felis mi, vehicula sed pretium sit amet, pellentesque vel nisl. Curabitur metus ante, pellentesque in lectus a, sagittis imperdiet mi.</td>
          </tr>
          {/* Outras linhas da tabela */}
        </tbody>
      </table>
      <div className="table-footer">
        {/* Conteúdo do rodapé da tabela */}
      </div>
    </div>
  );
}

export default Avaliadortable;
