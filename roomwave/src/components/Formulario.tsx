import React, { useState } from 'react';
import '../css/Formulario.css'; // Certifique-se de criar este arquivo CSS com os estilos fornecidos

const CenteredForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Lógica para lidar com o envio do formulário aqui
  };

  return (
    <div className="centered-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Seu Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome..."
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Seu Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Digite seu email..."
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Sua Mensagem:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Digite sua mensagem..."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CenteredForm;
