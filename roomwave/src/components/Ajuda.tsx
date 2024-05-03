import React, { useState } from 'react';
import '../css/Ajuda.css';
import NavBar from './NavBar';

const ShoppingHelp = () => {
  const accordionItems = [
    { title: 'Your Account', 
    content: 'Sua conta de usuário é o seu espaço pessoal onde você pode gerenciar suas informações, configurações e atividades. Aqui está uma visão geral do que você pode encontrar em sua conta: 1. **Informações Pessoais:** Na seção de informações pessoais, você pode visualizar e editar seu nome, endereço de e-mail, senha e outras informações de contato. 2. **Detalhes de Pagamento:** Se você fez compras em nosso site, poderá encontrar os detalhes de pagamento e histórico de transações nesta seção. Você também pode adicionar ou editar métodos de pagamento aqui.3. **Endereços de Entrega:** Se você costuma fazer pedidos de produtos físicos, esta seção permitirá que você gerencie seus endereços de entrega, adicionando, removendo ou atualizando-os conforme necessário.4. **Histórico de Pedidos:** Aqui, você pode visualizar um registro completo de todos os pedidos que você fez em nossa loja, incluindo detalhes como itens comprados, datas de compra e status do pedido.5. **Configurações de Comunicação:** Se você deseja receber atualizações, ofertas especiais ou newsletters, pode ajustar suas preferências de comunicação nesta seção.Lembre-se de que sua conta é privada e segura. Certifique-se de proteger suas informações de login e senha e nunca compartilhe-as com outras pessoas. Se precisar de ajuda ou tiver alguma dúvida sobre sua conta, não hesite em nos contatar através de nosso suporte ao cliente.',
    file: '/caminho/do/arquivo1.pdf' },
    { title: 'Payment & Pricing', content: 'Conteúdo de pagamento e preços', file: '/caminho/do/arquivo2.pdf' },
    { title: 'Returns & Refunds', content: 'Conteúdo de devoluções e reembolsos', file: '/caminho/do/arquivo3.pdf' },
    { title: 'Shipping & Pickup', content: 'Conteúdo de envio e retirada', file: '/caminho/do/arquivo4.pdf' },
    { title: 'Viewing & Changing Orders', content: 'Conteúdo de visualização e alteração de pedidos', file: '/caminho/do/arquivo5.pdf' }
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
      <div className='box'>
      <div className="help-wrapper">
        <h1 className="main-title">Ajuda</h1>
        {accordionItems.map((item, index) => (
          <div key={index} className="accordion-item">
            <input type="radio" id={`radio${item.title}`} name="accordion" defaultChecked={index === 0} style={{ display: 'none' }} />
            <label className="item" htmlFor={`radio${item.title}`} onClick={() => toggleAccordionItem(item.title)}>
              <div className="title">{item.title}</div>
              <div className={`content ${accordionState[item.title] ? 'active' : ''}`}>
                {item.content}
                <a href={item.file} download={`${item.title}.pdf`} className="download-button">Baixar</a>
              </div>
            </label>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default ShoppingHelp;
