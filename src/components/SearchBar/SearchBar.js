import React, { useState } from 'react';
import { SearchbarHeader, SearchForm, SearchFormButton, SearchFormInput, ResetButton } from './SearchBar.styled';
import { BiSearchAlt } from 'react-icons/bi';

import 'react-toastify/dist/ReactToastify.css'; // Імпорт стилів для сповіщень

function SearchBar({ onSubmit, onReset }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    onSubmit(inputValue);
    setInputValue('');
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type='submit'>
          <span><BiSearchAlt size={25} /></span> 
        </SearchFormButton>
        <SearchFormInput 
          className="input"
          type="text"
          autoFocus
          placeholder="search here"
          value={inputValue}
          onChange={handleChange}
        />
      </SearchForm>
      <ResetButton type='button' onClick={handleReset} >reset</ResetButton>
    </SearchbarHeader>
  );
}

export default SearchBar;
