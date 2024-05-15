import React from 'react';
import '../css/Ajuda.css';
import NavBar from './NavBar';
import Form from './Formulario';
import Footer from './footer';

function Ajuda() {
  return (
    <><NavBar /><div className="App">
      <header className="App-header">
        <h1>Centro de Ajuda</h1>
      </header>
      <section id="faq">
        <h2>Contacto</h2>
          <h2 style={{marginBottom:"40px"}}>Entre em contato com nossa equipe através dos seguintes meios:</h2>
        <div className="contact-info">
          <div className="email-info">
            <h2>RoomWave@empresa.com</h2>
            <p>E-mail</p>
          </div>
          <div className="phone-info">
            <h2>+351 915 525 048</h2>
            <p>Número de telefone</p>
          </div>
        </div>
        <h2 style={{marginBottom:"30px"}}>Perguntas Frequentes</h2>
        <ul>
          <li>
            <h2  className="textoTitulo">Em que consiste o RoomWave?</h2>
            <p className="texto">O roomWave é uma plataforma que tenta facilitar a vida de qualquer pessoa à procura de um quarto em Portugal e também de senhorios que procurem publicitar os seus quartos.
Para além disso, os senhorios podem sujeitar os seus quartos à avaliação de um dos nossos certificadores para ganhar o nosso fidedigno certificado “RoomWave’s Choice” que certifica ao cliente que o quarto publicitado corresponde à realidade.</p>
          </li>
          <li>
            <h2 className="textoTitulo">Como encontro um quarto ideal para mim?</h2>
            <p className="texto">Na nossa plataforma os quartos estão distribuídos por distrito, então pode segurar o rato por cima da barra de pesquisa no canto superior direito e escolher a cidade pretendida. Depois disso será redirecionado para uma página com a lista de quartos nessa cidade, onde pode filtrar por orçamento, disponibilidade, género e muito mais.
Depois basta clicar num quarto que goste e entrar em contacto com o senhorio, seja através do seu número de telemóvel / email ou atráves do nosso sistema de chat.</p>
          </li>
          <li>
            <h2 className='textoTitulo'>Sou senhorio e quero adicionar um quarto na plataforma, o que faço?</h2>
            <p className="texto">O processo de inserir um quarto na nossa plataforma é bastante simples, depois de se ter registado como senhorio irá aparecer uma opção na barra superior “Adicionar Quarto”. Ao clicar aí, irá ser redirecionado para uma página com um pequeno formulário onde poderá inserir algumas informações sobre o quarto e também algumas fotos. Pode também colocar o seu quarto para avaliação de um dos nossos certificadores. No fim é só clicar no botão “Inserir Quarto” e o seu quarto será automaticamente adicionado  à plataforma. </p>
          </li>
        </ul>
      </section>
      <section id="contact">
        <h2>Contacta diretamente através do nosso formulário</h2>
        <Form />
      </section>
    </div>
    <Footer />
    </>
  );
}

export default Ajuda;
