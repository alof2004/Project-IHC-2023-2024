import React, { useState } from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  position: relative;
  width: 33rem;
  background: var(--color-brand);
  margin-left: 50%;
  margin-top: 100px;
  background: var(--color-dark);
`;

const StyledInput = styled.input`
  height: var(--height);
  font-family: var(--font-fam);
  border: 0;
  color: var(--color-dark);
  font-size: 1.8rem;
  outline: 0;
  width: 100%;
  padding: 0 1.6rem;
  border-radius: var(--rad);
  appearance: none;
  

  position: relative;

  &:not(:placeholder-shown) {
    border-radius: var(--rad) 0 0 var(--rad);
    width: calc(100% - var(--btn-width));
    + button {
      display: block;
    }
  }
`;

const StyledButton = styled.button`
  display: none;
  position: absolute;
  top: 0;
  right: 88px;
  width: var(--btn-width);
  font-weight: bold;
    border-radius: 0 var(--rad) var(--rad) 0;
`;

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
    <StyledForm onSubmit={handleSubmit} role="search">
      <label htmlFor="search" className="sr-only"></label>
      <StyledInput
        id="search"
        type="search"
        placeholder="Pesquise pelo seu estabelecimento"
        autoFocus
        required
        value={searchQuery}
        onChange={handleChange}
      />
      <StyledButton type="submit">Go</StyledButton>
    </StyledForm>
  );
};

export default SearchForm;
