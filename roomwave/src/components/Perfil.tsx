import React, { useState, useEffect } from 'react';
import '../css/Perfil.css';
import NavBarClient from './NavBarClient';

function Perfil() {
  const [userData, setUserData] = useState<any>(null); // Definindo o tipo como 'any'
  const [photo, setPhoto] = useState<string | null>(null); // Estado para armazenar a foto do usuário

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

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtém o primeiro arquivo selecionado pelo usuário

    if (file) {
      // Converte o arquivo para uma URL de objeto e define como a foto do usuário
      const imageUrl = URL.createObjectURL(file);
      setPhoto(imageUrl);
    }
  };

  return (
    <>
      <NavBarClient />
      <div className="profile-container">
        <h2>Perfil do Cliente</h2>
        <div className="content-container">
          <div className="photo-container">
            {photo ? (
              <img src={photo} alt="Foto do usuário" />
            ) : (
              <label className="custom-file-upload">
                <input type="file" onChange={handlePhotoChange} accept="image/*" />
                Escolher Foto
              </label>
            )}
          </div>
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
        </div>
      </div>
    </>
  );
}

export default Perfil;
