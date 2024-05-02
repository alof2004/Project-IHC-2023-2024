import React, { useState } from 'react';
import '../css/searchuni.css'; // Importe o arquivo CSS com os estilos

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Lógica de busca
    console.log('Search query:', searchQuery);
  };

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} role="search" className="search-form">
      <label htmlFor="search" className="sr-only"></label>
      <input
        id="search"
        type="search"
        placeholder="Pesquise pelo seu estabelecimento"
        autoFocus
        required
        value={searchQuery}
        onChange={handleChange}
        className="search-input"
      />
      <button type="submit" className="search-button">Go</button>
    </form>
  );
};

export default SearchForm;
