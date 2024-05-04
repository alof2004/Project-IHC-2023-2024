import React from 'react';
import '../css/Ajuda.css';
import NavBar from './NavBar';

function Ajuda() {
  return (
    <><NavBar /><div className="App">
      <header className="App-header">
        <h1>Centro de Ajuda</h1>
      </header>
      <section id="faq">
        <h2>Contacto</h2>
          <h3 style={{marginBottom:"40px"}}>Entre em contato com nossa equipe através dos seguintes meios:</h3>
        <div className="contact-info">
          <div className="email-info">
            <h3>contato@empresa.com</h3>
            <p>E-mail:</p>
          </div>
          <div className="phone-info">
            <h3>+55 11 1234-5678</h3>
            <p>Número de telefone:</p>
          </div>
        </div>
        <h2 style={{marginBottom:"30px"}}>Perguntas Frequentes</h2>
        <ul>
          <li>
            <h3>Em que consiste o RoomWave?</h3>
            <p>O roomWave é uma plataforma que tenta facilitar a vida de qualquer pessoa à procura de um quarto em Portugal e também de senhorios que procurem publicitar os seus quartos.
Para além disso, os senhorios podem sujeitar os seus quartos à avaliação de um dos nossos certificadores para ganhar o nosso fidedigno certificado “RoomWave’s Choice” que certifica ao cliente que o quarto publicitado corresponde à realidade.</p>
          </li>
          <li>
            <h3>Como encontro um quarto ideal para mim?</h3>
            <p>Na nossa plataforma os quartos estão distribuídos por distrito, então pode segurar o rato por cima da barra de pesquisa no canto superior direito e escolher a cidade pretendida. Depois disso será redirecionado para uma página com a lista de quartos nessa cidade, onde pode filtrar por orçamento, disponibilidade, género e muito mais.
Depois basta clicar num quarto que goste e entrar em contacto com o senhorio, seja através do seu número de telemóvel / email ou atráves do nosso sistema de chat.</p>
          </li>
          <li>
            <h3>Sou senhorio e quero adicionar um quarto na plataforma, o que faço?</h3>
            <p>O processo de inserir um quarto na nossa plataforma é bastante simples, depois de se ter registado como senhorio irá aparecer uma opção na barra superior “Adicionar Quarto”. Ao clicar aí, irá ser redirecionado para uma página com um pequeno formulário onde poderá inserir algumas informações sobre o quarto e também algumas fotos. Pode também colocar o seu quarto para avaliação de um dos nossos certificadores. No fim é só clicar no botão “Inserir Quarto” e o seu quarto será automaticamente adicionado  à plataforma. </p>
          </li>
        </ul>
      </section>
      <section id="contact">
        <h2>Contacta diretamente através do nosso formulário</h2>
        <form className="contact-form">
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" name="name" className="input-field" />
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" className="input-field" />
          <label htmlFor="message">Mensagem:</label>
          <textarea id="message" name="message" className="textarea-field"></textarea>
          <button type="submit" className="submit-button">Enviar</button>
        </form>
      </section>
    </div></>
  );
}

export default Ajuda;
