import React, { useState, useEffect } from 'react';
import '../css/Perfil.css';
import NavBarClient from './NavBarClient';

function Perfil() {
  const [userData, setUserData] = useState<any>(null); // Definindo o tipo como 'any'

  useEffect(() => {
    // Obtém os dados do usuário armazenados no localStorage
    const storedData = localStorage.getItem('userData');

    // Verifica se há dados armazenados
    if (storedData) {
      // Converte os dados armazenados de volta para um objeto JavaScript
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
    }
  }, []);

  return (
    <><NavBarClient />
    <div className="profile-container">
          <h2>Perfil do Cliente</h2>
          {userData ? (
              <div className="profile-info">
                  <p><strong>Nome:</strong> {userData.firstname} {userData.lastname}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Data de Nascimento:</strong> {userData.birthdate}</p>
                  <p><strong>Função:</strong> {userData.job}</p>
                  <p><strong>Telefone:</strong> {userData.phone}</p>
              </div>
          ) : (
              <p>Nenhuma informação de perfil encontrada.</p>
          )}
      </div></>
  );
}

export default Perfil;
