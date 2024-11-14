// Styles
import './App.css';

// React
import { useEffect, useState } from 'react';

// Functions
import { APIConnect } from './functions';

// Components
import Comics from './components/Comics';
import SelectedComic from './components/SelectedComic';
import FavoritesModal from './components/FavoritesModal';
import Header from './components/UI/Header';


function App() {
  
  const [loading, setLoading] = useState(true); // Estado para controlar el loading
  const [comics, setComics] = useState([]); // Estado para almacenar los comics
  const [mode, setMode] = useState(1); // Estado para controlar el modo de el grid de la pagina
  const [favoriteComics, setFavoriteComics] = useState(APIConnect.getLocalFavourites()); // Estado para almacenar los favoritos
  const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el termino de busqueda

  // Estado para controlar el comic seleccionado y, por ende, el modal de comics
  const [selectedComic, setSelectedComic] = useState(() => {
    const path = window.location.pathname.split('/');
    const comic = path[1] === 'comic' ? path[2] : null;
    return comic ? parseInt(comic) : null;
  });

  // Estado para controlar el modal de favoritos
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(window.location.pathname === '/favorites');

  // Estado para controlar el color del tema (dark o light)
  const [colorMode, setColorMode] = useState(() => {
    const mode = APIConnect.getColorMode();
    document.body.className = mode === 'dark' ? 'dark' : 'light';
    return mode;
  }); 

  // Logica para controlar el color del tema (dark o light)
  const handleColorMode = (mode) => {
    if (mode) {
      APIConnect.setColorMode(mode);
      setColorMode(mode);
    }else{
     mode = APIConnect.getColorMode();
     setColorMode(mode);
    }
    document.body.className = mode === 'dark' ? 'dark' : 'light';
  };

  // Logica para añadir y eliminar comics de favoritos
  const toggleFavoriteComic = (comic) => {
    
    const storedFavorites = APIConnect.getLocalFavourites();
    const isInFavorites = storedFavorites.some((fav) => fav.id === comic.id);

    if (isInFavorites) { // Si esta en favoritos
      // Eliminamos el comic de favoritos
      const updatedFavorites = storedFavorites.filter((fav) => fav.id !== comic.id);
      setFavoriteComics(updatedFavorites);
      APIConnect.setLocalFavourites(updatedFavorites);
    } else { // Si no esta en favoritos
      // Añadimos el comic a favoritos, 
      // Añadimos el comic completo ya que al buscar por el id dentro de nuestros comics los que no esten (fueron buscados previamente) no apareceran renderizados, de esta forma si apareceran
      const updatedFavorites = [...storedFavorites, comic];
      setFavoriteComics(updatedFavorites);
      APIConnect.setLocalFavourites(updatedFavorites);
    }
  };

  // Logica para cargar los comics
  useEffect(()=>{

    setLoading(true);
    
    if (searchTerm.length < 2) { // Si hay solo dos caracteres, no realizamos la busqueda
      // Carga de comics
        APIConnect.listComics()
          .then((data) => {
            const newComics = data.data.results.filter((el) => el.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'); // Eliminamos los comics que no tengan imagen
            setComics(newComics); // Actualizamos el estado de los comics
            setLoading(false); // Finalizamos el loading
            console.log(newComics);
          });

    }else {
      // Busqueda, reemplazamos los comics por los resultados de la busqueda
        APIConnect.searchComics(searchTerm)
          .then((data) => {
            const newComics = data.data.results.filter((el) => el.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'); // Eliminamos los comics que no tengan imagen
            setComics(newComics); // Actualizamos el estado de los comics por los resultados de la busqueda
            setLoading(false); // Finalizamos el loading
            console.log(newComics);
          });
   }

  },[searchTerm]); // Repetimos el efecto cada vez que cambie el termino de busqueda

  // Logica para actualizar la url y el titulo de la pagina
  useEffect(() => {

    if (selectedComic) { // Si hay un comic seleccionado
      window.history.replaceState({}, '', `/comic/${selectedComic}`); // Actualizamos la url
      const comic = comics.find((c) => c.id === selectedComic); // Buscamos el comic seleccionado
      document.title = comic ? `${comic.title}` : '| Marvel Comics'; // Actualizamos el titulo de la pagina
    } else if (favoritesModalOpen) {
      window.history.replaceState({}, '', '/favorites'); // Actualizamos la url
      document.title = 'Marvel Comics | Favorites'; // Actualizamos el titulo de la pagina
    } else {
      window.history.replaceState({}, '', '/'); // Actualizamos la url
      document.title = 'Marvel Comics'; // Actualizamos el titulo de la pagina
    }

  }, [selectedComic, favoritesModalOpen, comics]); // Repetimos el efecto cada vez que cambie el comic seleccionado, el estado de el modal de favoritos o los comics

  // Efecto para controlar el historial del navegador
  useEffect(() => {
    
    const handlePopState = () => {
      const path = window.location.pathname.split('/');
      if (path[1] === 'comic') {
          setSelectedComic(parseInt(path[2]));
      } else if (path[1] === 'favorites') {
          setFavoritesModalOpen(true);
          setSelectedComic(null);
      }else{
        setSelectedComic(null);
        setFavoritesModalOpen(false);
      }
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <>
      {/* Header */}
      <Header
        setMode={setMode}
        mode={mode}
        colorMode={colorMode}
        handleColorMode={handleColorMode}
        setFavoritesModalOpen={setFavoritesModalOpen}
        favoriteComics={favoriteComics}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Grid de comics */}
      <Comics
        comics={comics}
        selectedComic={selectedComic}
        setSelectedComic={setSelectedComic}
        toggleFavoriteComic={toggleFavoriteComic}
        loading={loading}
      />

      {/* Modal de favoritos */}
      <FavoritesModal
        isOpen={favoritesModalOpen}
        onClose={() => setFavoritesModalOpen(false)}
        comics={favoriteComics}
        toggleFavoriteComic={toggleFavoriteComic}
        setSelectedComic={setSelectedComic}
        loading={loading}
      />

      {/* Modal de comics */}
      <SelectedComic
        selectedComic={selectedComic}
        setSelectedComic={setSelectedComic}
        id="selected_comic"
        toggleFavoriteComic={toggleFavoriteComic}
        onClose={() => setSelectedComic(null)}
        openFavorites={() => setFavoritesModalOpen(true)}
      />

      {/* Modal de favoritos y el de comics colocados asi para poder crear el efecto de superposicion al abrir un comic desde el modal de favoritos */}

    </>
  );
}

export default App; 