const REACT_APP_KEY = '60d4ded36bcb02a99e0c7eb79457e592';
const REACT_APP_HASH = 'd27552df26eea0cda842fb73832b3617';

const getComics = (offset = 0) => {
  const url = `https://gateway.marvel.com:443/v1/public/comics?offset=${offset}&apikey=${REACT_APP_KEY}&ts=1&hash=${REACT_APP_HASH}`;
  return fetch(url).then(response => response.json());
};

const getComic = (id) => {
  const url = `https://gateway.marvel.com:443/v1/public/comics/${id}?apikey=${REACT_APP_KEY}&ts=1&hash=${REACT_APP_HASH}`;
  return fetch(url).then(response => response.json());
};
const getComicCharacters = (id) => {
  const url = `https://gateway.marvel.com:443/v1/public/comics/${id}/characters?apikey=${REACT_APP_KEY}&ts=1&hash=${REACT_APP_HASH}`;
  return fetch(url).then(response => response.json());
};
const getWithURI = (resourceURI) => {
  const url = resourceURI.replace(/^http:/, 'https:') + `?apikey=${REACT_APP_KEY}&ts=1&hash=${REACT_APP_HASH}`;
  return fetch(url).then(response => response.json());
};

const getLocalFavourites = () => {
  return JSON.parse(localStorage.getItem('favoriteComics')) || [];
};

const setLocalFavourites = (comics) => {
  localStorage.setItem('favoriteComics', JSON.stringify(comics));
};

const searchComics = (searchTerm) => {
  const url = `https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${searchTerm}&apikey=${REACT_APP_KEY}&ts=1&hash=${REACT_APP_HASH}`;
  return fetch(url).then(response => response.json());
};

const getColorMode = () => {
  return localStorage.getItem('colorMode') || 'light';
};
const setColorMode = (mode) => {
  localStorage.setItem('colorMode', mode);
};

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
