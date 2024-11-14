const REACT_APP_KEY = '60d4ded36bcb02a99e0c7eb79457e592';
const REACT_APP_HASH = 'd27552df26eea0cda842fb73832b3617';

 

// Funcion para obtener los comics
const getComics = (offset = 0) => {
  const url = `https://gateway.marvel.com:443/v1/public/comics?orderBy=modified&noVariants=true&limit=40&offset=${offset}&apikey=${REACT_APP_KEY}&ts=1&hash=${REACT_APP_HASH}`;
  return fetch(url).then(response => response.json());
};

// Funcion para obtener informacion detallada de un comic en especifico
const getComic = (id) => {
  const url = `https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=${REACT_APP_KEY}&ts=1&hash=${REACT_APP_HASH}`;
  return fetch(url).then(response => response.json());
};

// Funcion para obtener los personajes de un comic en especifico
const getComicCharacters = (id) => {
  const url = `https://gateway.marvel.com:443/v1/public/comics/${id}/characters?apikey=${REACT_APP_KEY}&ts=1&hash=${REACT_APP_HASH}`;
  return fetch(url).then(response => response.json());
};


// Funcion para obtener informacion de un recurso en especifico pasado por parametro
const getWithURI = (resourceURI) => {
  const url = resourceURI.replace(/^http:/, 'https:') + `?apikey=${REACT_APP_KEY}&ts=1&hash=${REACT_APP_HASH}`;
  return fetch(url).then(response => response.json());
};


// Funcion para obtener los favoritos locales
const getLocalFavourites = () => {
  return JSON.parse(localStorage.getItem('favoriteComics')) || [];
};

// Funcion para setear los favoritos locales
const setLocalFavourites = (comics) => {
  localStorage.setItem('favoriteComics', JSON.stringify(comics));
};

// Funcion para buscar comics por nombre
const searchComics = (searchTerm, offset = 0) => {
  const url = `https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${searchTerm}&offset=${offset}&apikey=${REACT_APP_KEY}&ts=1&hash=${REACT_APP_HASH}`;
  return fetch(url).then(response => response.json());
};

// Funcion para obtener el color del tema
const getColorMode = () => {
  return localStorage.getItem('colorMode') || 'light';
};

// Funcion para setear el color del tema
const setColorMode = (mode) => {
  localStorage.setItem('colorMode', mode);
};


// Exportacion de las funciones en un objeto
export const APIConnect = {
  listComics: getComics,
  getComic,
  getComicCharacters,
  getLocalFavourites,
  setLocalFavourites,
  searchComics,
  getWithURI,
  getColorMode,
  setColorMode
};
