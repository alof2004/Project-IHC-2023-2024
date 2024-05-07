import React, { useState, useEffect } from 'react';
import '../css/Perfil.css';
import NavBarClient from './NavBarClient';
import Footer from './footer';

function Perfil() {
  const [userData, setUserData] = useState<any>(null); // Definindo o tipo como 'any'
  const [photo, setPhoto] = useState<string | null>(null); // Estado para armazenar a foto do usuário
  const [isEditing, setIsEditing] = useState<boolean>(false); // Estado para controlar se o perfil está em modo de edição

  useEffect(() => {
    // Obtém os dados do usuário armazenados no localStorage
    const storedData = localStorage.getItem('userData');
    const storedPhoto = localStorage.getItem('userPhoto');

    // Verifica se há dados armazenados
    if (storedData) {
      // Converte os dados armazenados de volta para um objeto JavaScript
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
    }

    if (storedPhoto) {
      setPhoto(storedPhoto);
    }
  }, []);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Obtém o primeiro arquivo selecionado pelo usuário

    if (file) {
      // Converte o arquivo para uma URL de objeto e define como a foto do usuário
      const imageUrl = URL.createObjectURL(file);
      setPhoto(imageUrl);

      // Armazena a URL da imagem no localStorage
      localStorage.setItem('userPhoto', imageUrl);
    }
  };

  const handleEditButtonClick = () => {
    setIsEditing(true); // Altera o estado para indicar que o perfil está em modo de edição
  };

  const handleSaveButtonClick = () => {
    setIsEditing(false); // Altera o estado para indicar que o perfil não está mais em modo de edição

    // Atualiza os dados do usuário no localStorage
    const updatedData = {
      ...userData,
      firstname: (document.getElementById('firstname') as HTMLInputElement)?.value,
      lastname: (document.getElementById('lastname') as HTMLInputElement)?.value,
      email: (document.getElementById('email') as HTMLInputElement)?.value,
      birthdate: (document.getElementById('birthdate') as HTMLInputElement)?.value,
      job: (document.getElementById('job') as HTMLInputElement)?.value,
      phone: (document.getElementById('phone') as HTMLInputElement)?.value,
    };

    localStorage.setItem('userData', JSON.stringify(updatedData));
    setUserData(updatedData);
  };

  return (
    <>
      <NavBarClient />
      <div className="profile-container">
        <h2>Perfil do Senhorio</h2>
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
          {userData && !isEditing ? (
            <div className="profile-info">
              <p><strong>Nome:</strong> {userData.firstname} {userData.lastname}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Data de Nascimento:</strong> {userData.birthdate}</p>
              <p><strong>Função:</strong> {userData.job}</p>
              <p><strong>Telefone:</strong> {userData.phone}</p>
              <button onClick={handleEditButtonClick}>Editar</button>
            </div>
          ) : null}
          {isEditing ? (
            <div className="profile-info">
              <input type="text" id="firstname" defaultValue={userData?.firstname} placeholder="Nome" />
              <input type="text" id="lastname" defaultValue={userData?.lastname} placeholder="Sobrenome" />
              <input type="email" id="email" defaultValue={userData?.email} placeholder="Email" />
              <input type="date" id="birthdate" defaultValue={userData?.birthdate} placeholder="Data de Nascimento" />
              <input type="text" id="job" defaultValue={userData?.job} placeholder="Função" />
              <input type="tel" id="phone" defaultValue={userData?.phone} placeholder="Telefone" />
              <button onClick={handleSaveButtonClick}>Salvar</button>
            </div>
          ) : null}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Perfil;
