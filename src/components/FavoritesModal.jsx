import React, { useEffect } from 'react';
import Modal from './UI/Modal';
import Comics from './Comics';
import { useState } from 'react';
import MainButton from './UI/MainButton';
import Loader from './UI/Loader';


// Componente del contenido del modal de favoritos
const FavoriteComics = ({comics, toggleFavoriteComic, setSelectedComic, setIsVisible, onClose, loading}) => {
    
    // Si está cargando, renderizamos el loader
    if (loading === true) {
        return <Loader />
    }

    // Si no está cargando y no hay comics, renderizamos un mensaje
    if (loading === false && comics && comics.length === 0) {
        return (
            <div className="no-favorites-message">
            <p>No favorites yet :(</p>
            <MainButton className='favorites_modal_button' onClick={() => {
                 setIsVisible(false);
                 setTimeout(() => {
                    onClose();
                    }, 500);
                 }
                
            }>
                <span className='favorites_modal_button_text'>CLOSE</span>
            </MainButton>
            </div>
        )
    }

    // Si no pasa nada de eso, entonces hay comics y, por tanto, renderizamos el grid de favoritos
    return (
        <div className='favorites_modal'>
            <h2 className='favorites_modal_title'>Favorites</h2>
                <Comics 
                    comics={comics} 
                    toggleFavoriteComic={toggleFavoriteComic} 
                    setSelectedComic={setSelectedComic} 
                    loading={loading}
                />
       </div>
    );
}

// Componente modal de favoritos
const FavoritesModal = ({ isOpen, onClose, comics, toggleFavoriteComic, setSelectedComic, loading }) => {

    const [isVisible, setIsVisible] = useState(false); // Manejamos visibilidad por tema de transiciones de css

    return (
        <Modal isOpen={isOpen} onClose={onClose} id="favorites_modal" setIsVisible={setIsVisible} isVisible={isVisible}>
            <FavoriteComics 
                comics={comics} 
                toggleFavoriteComic={toggleFavoriteComic} 
                setIsVisible={setIsVisible}
                setSelectedComic={setSelectedComic} 
                onClose={onClose}
                loading={loading}
            />
        </Modal>
    );
};


// Exportamos solo la modal
export default FavoritesModal; 
