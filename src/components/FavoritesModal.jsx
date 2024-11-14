import React, { useEffect } from 'react';
import Modal from './UI/Modal';
import Comics from './Comics';
import { useState } from 'react';
import MainButton from './UI/MainButton';
import Loader from './UI/Loader';

const FavoriteComics = ({comics, toggleFavoriteComic, setSelectedComic, setIsVisible, onClose, loading}) => {
    
    if (loading === true) {
        return <Loader />
    }

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

    const [isVisible, setIsVisible] = useState(false);

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

export default FavoritesModal; 