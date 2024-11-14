import { useEffect, useState } from 'react'
import './App.css'
import {APIConnect} from './functions';
import Comics from './components/Comics';
import SelectMode from './components/UI/SelectMode';
import SelectedComic from './components/SelectedComic';
import FavoritesModal from './components/FavoritesModal';
import MainButton from './components/UI/MainButton';

function App() {
  
  const [loading, setLoading] = useState(true);

  const [comics, setComics] = useState([]); // Inicializamos a null = loading si  carga y no hay es nada comics
  const [comicsOffset, setComicsOffset] = useState(0);

  const [mode, setMode] = useState(1);
  const [favoriteComics, setFavoriteComics] = useState([]); // Inicializamos a null = loading si  carga y no hay es nada comics

  
  const [selectedComic, setSelectedComic] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const comic = params.get('comic');
    return comic ? parseInt(comic) : null;
  });

  const [favoritesModalOpen, setFavoritesModalOpen] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('open') === 'favorites';
  });

  const [colorMode, setColorMode] = useState(()=>{
    return APIConnect.getColorMode();
  });

  
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleFavoriteComic = (comic) => {
    const storedFavorites = APIConnect.getLocalFavourites();
    const isInFavorites = storedFavorites.some(fav => fav.id === comic.id);
    
    if(isInFavorites){
      // Remove from favorites
      const updatedFavorites = storedFavorites.filter(fav => fav.id !== comic.id);
      setFavoriteComics(updatedFavorites);
      APIConnect.setLocalFavourites(updatedFavorites);
    } else {
      // Add to favorites
      const updatedFavorites = [...storedFavorites, comic];
      setFavoriteComics(updatedFavorites);
      APIConnect.setLocalFavourites(updatedFavorites);
    }
  };





  useEffect(() => {
    // Apply the color mode class to the body
    APIConnect.setColorMode(colorMode);
    document.body.className = colorMode === 'dark' ? 'dark' : 'light';
  }, [colorMode]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(true);
      
      if (searchTerm.length < 2) {
        APIConnect.listComics()
          .then(data => {
            const comics = data.data.results.filter(el => el.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available');
            setComics(comics);
          })
          .finally(() => setLoading(false));
        return;
      }
      
      APIConnect.searchComics(searchTerm)
        .then(data => {
          const comics = data.data.results.filter(el => el.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available');
          setComics(comics);
        })
        .finally(() => setLoading(false));
    }, 750);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Update URL based on both states
    if (selectedComic) {
      params.set('comic', selectedComic);
    } else {
      params.delete('comic');
    }
    
    if (favoritesModalOpen) {
      params.set('open', 'favorites');
    } else {
      params.delete('open');
    }
    
    // Update URL
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.pushState({}, '', newUrl);
  }, [selectedComic, favoritesModalOpen]);

  useEffect(() => {

    APIConnect.listComics(comicsOffset).then(data => setComics(prev => {
      console.log(data.data.results);
      const comics = data.data.results.filter(el => el.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available');
      setFavoriteComics(APIConnect.getLocalFavourites());
      return [...prev, ...comics];
    }));
    
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const comic = params.get('comic');
      const isFavoritesOpen = params.get('open') === 'favorites';
      
      setSelectedComic(comic ? parseInt(comic) : null);
      setFavoritesModalOpen(isFavoritesOpen);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);

  }, [comicsOffset]);

  useEffect(() => {
    if (selectedComic) {
      const comic = comics.find(c => c.id === selectedComic);
      document.title = comic ? `${comic.title}` : '| Marvel Comics';
    } else if (favoritesModalOpen) {
      document.title = 'Marvel Comics | Favorites';
    } else {
      document.title = 'Marvel Comics';
    }
  }, [selectedComic, favoritesModalOpen, comics]);

  return (
    <>
      <header>
        <div className="header_content">
          <div className="header_content_left">
            <SelectMode setMode={setMode} mode={mode} />
            <label className="switch">
              <input 
              checked={colorMode === 'dark'}
              type="checkbox" 
              onChange={()=>setColorMode(colorMode === 'dark' ? 'light' : 'dark')} />
              <span className="slider round"></span>
          </label>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search comics..."
            className="search_input"
          />

          <MainButton onClick={() => setFavoritesModalOpen(true)} className="header_favorite">
             Favorites ({favoriteComics !== null && favoriteComics && (favoriteComics.length)})
          </MainButton>
        </div>
      </header>
      
      <Comics 
        comics={comics} 
        selectedComic={selectedComic} 
        setSelectedComic={setSelectedComic} 
        toggleFavoriteComic={toggleFavoriteComic}
        loading={loading}
        setOffset={setComicsOffset}
      />

      <FavoritesModal 
        isOpen={favoritesModalOpen} 
        onClose={() => setFavoritesModalOpen(false)}
        comics={favoriteComics}
        toggleFavoriteComic={toggleFavoriteComic}
        setSelectedComic={setSelectedComic}
        loading={loading}
      />


      <SelectedComic 
        selectedComic={selectedComic} 
        setSelectedComic={setSelectedComic}
        id="selected_comic"
        toggleFavoriteComic={toggleFavoriteComic}
        onClose={() => setSelectedComic(null)}
        openFavorites={() => setFavoritesModalOpen(true)}
      />

    </>
  )
}

export default App
