import Modal from './UI/Modal';
import Loader from './UI/Loader';
import { useState } from 'react';

const SeriesContent = ({ series }) => (
    <div className="modal_content_wrapper">
        <div className="modal_image_container">
            <img 
                src={`${series.thumbnail.path}.${series.thumbnail.extension}`} 
                alt={series.title} 
            />
        </div>
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

            {series.creators?.items?.length > 0 && (
                <div className="modal_creators">
                    <h3>Creators</h3>
                    <ul>
                        {series.creators.items.map((creator, index) => (
                            <li key={index} className="modal_creatorItem">
                                {creator.name} - {creator.role}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {series.urls?.length > 0 && (
                <div className="modal_links">
                    <h3>Links</h3>
                    <ul>
                        {series.urls.map((url, index) => (
                            <li key={index} className="modal_linkItem">
                                <a href={url.url} target="_blank" rel="noopener noreferrer">
                                    {url.type}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
);

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
            {series ? (
                <SeriesContent series={series} />
            ) : (
                <Loader />
            )}
        </Modal>
    );
};

export default SeriesModal; 