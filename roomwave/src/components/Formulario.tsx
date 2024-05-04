import React, { useState, ChangeEvent } from 'react';
import '../css/Formulario.css'; // Certifique-se de criar este arquivo CSS com os estilos fornecidos

const CenteredForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Armazenar os dados no LocalStorage
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const newMessage = { ...formData };
    messages.push(newMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // Limpar o formulário
    setFormData({
      name: '',
      email: '',
      message: ''
    });

    // Marcar o envio do formulário como verdadeiro
    setIsSubmitted(true);
  };

  return (
    <section id="contact">
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
        {isSubmitted && <div className="success-message">Obrigado! Sua mensagem foi enviada com sucesso.</div>}
      </div>
    </section>
  );
};

export default CenteredForm;
