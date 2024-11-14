import Modal from './UI/Modal';
import Loader from './UI/Loader';
import { useState } from 'react';
import { ComicCreators, ComicImage } from './SelectedComic';

// Componente para renderizar el contenido del modal de series
const SeriesContent = ({ series }) => (
    <div className="modal_content_wrapper">
       <ComicImage thumbnail={series.thumbnail}  alt={series.title} />
        <div className='modal_content_container'>
            <h1 className="modal_title">{series.title}</h1>
            {series.description && (
                <div className="modal_description">
                    {series.description}
                </div>
            )}
            {series.startYear && series.endYear && (
                <div className="modal_series_years">
                    <h3>Publication</h3>
                    <p>{series.startYear} - {series.endYear}</p>
                </div>
            )}
            <ComicCreators creators={series.creators} />
        </div>
    </div>
);

// Componente para renderizar el modal de series
const SeriesModal = ({ series, onClose, isOpen }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            id="series_modal"
            setIsVisible={setIsVisible}
            isVisible={isVisible}
        >
            {series ? (<SeriesContent series={series} />) : (<Loader />)}
        </Modal>
    );
};

export default SeriesModal; 