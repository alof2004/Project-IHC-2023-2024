import React, { useState } from 'react';
import '../css/Ajuda.css';
import { Nav } from 'react-bootstrap';
import NavBar from './NavBar';

const ShoppingHelp = () => {
  const accordionItems = [
    { title: 'Your Account', content: 'Conteúdo da conta' },
    { title: 'Payment & Pricing', content: 'Conteúdo de pagamento e preços' },
    { title: 'Returns & Refunds', content: 'Conteúdo de devoluções e reembolsos' },
    { title: 'Shipping & Pickup', content: 'Conteúdo de envio e retirada' },
    { title: 'Viewing & Changing Orders', content: 'Conteúdo de visualização e alteração de pedidos' }
  ];

  // Estado para rastrear se cada item do acordeão está aberto ou fechado
  const [accordionState, setAccordionState] = useState<{ [key: string]: boolean }>({});

  // Função para alternar o estado de um item do acordeão
  const toggleAccordionItem = (item: string) => {
    setAccordionState(prevState => ({
      ...prevState,
      [item]: !prevState[item] // Inverte o estado atual
    }));
  };

  return (
    <>
      <NavBar /> {/* Adicionando margem inferior */}
      <div className="help-wrapper">
        <h1 className="main-title">Ajuda</h1>
        {accordionItems.map((item, index) => (
          <React.Fragment key={index}>
            <input type="radio" id={`radio${item.title}`} name="accordion" defaultChecked={index === 0} style={{ display: 'none' }} />
            <label className="item" htmlFor={`radio${item.title}`} onClick={() => toggleAccordionItem(item.title)}>
              <div className="title">{item.title}</div>
              <div className={`content ${accordionState[item.title] ? 'active' : ''}`}>
                {item.content}
              </div>
            </label>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default ShoppingHelp;
