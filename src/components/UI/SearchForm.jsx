import { useEffect, useState } from 'react';
import MainButton from './MainButton';

// Formulario de busqueda
const SearchForm = ({setSearchTerm}) => (
      <form className="search_form" onSubmit={(e)=>{
          e.preventDefault();
          setSearchTerm(e.target.search.value); // Si enviamos el formulario, se actualiza el searchTerm
      }}>

          <input
            type="text"
            name="search"
            onChange={(e)=>{if (e.target.value.length < 2) setSearchTerm('')}} // Si el input tiene menos de 2 caracteres, se limpia el searchTerm
            placeholder="Search comics..."
            className="search_input"
          />
          <MainButton className="search_button" type="submit">
            Search
          </MainButton>

      </form>  
);


export default SearchForm;