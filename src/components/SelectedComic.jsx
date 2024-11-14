import { useEffect, useState } from "react"
import {APIConnect} from '../functions';
import Modal from './UI/Modal';
import MainButton from "./UI/MainButton";
import Loader from "./UI/Loader";
import SeriesModal from "./SeriesModal";


// Componente para renderizar la imagen del comic
const ComicImage = ({ thumbnail, title }) => (
 thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && (   
    <div className='modal_image_container'>
        <img 
            src={`${thumbnail.path}.${thumbnail.extension}`} 
            alt={title} 
        />
    </div>
    )
);

// Componente para renderizar el header del comic
const ComicHeader = ({ title, issueNumber, isFavorited, toggleFavoriteComic, comic, price, link, pages }) => (
    <>
        <h1 className="modal_title">{title}</h1>
        <div className="modal_issue_container">
            <h2 className="modal_issueNumber">Issue #{issueNumber}</h2>
            <h2 className="modal_issueNumber">${price}</h2>
           {pages > 0 && ( <h2 className="modal_issueNumber">{pages}</h2>)}
            <MainButton 
                className="modal_favorite_button"
                onClick={() => toggleFavoriteComic(comic)}
            >
                {isFavorited ? '★' : '☆'}
            </MainButton>
            <MainButton 
                className="modal_favorite_button"
                onClick={() => window.open(link, '_blank')}
            >
                MORE INFO
            </MainButton>
        </div>
    </>
);

// Componente para renderizar los creadores del comic
const ComicCreators = ({ creators }) => (
    creators.items.length > 0 && (
        <div className="modal_creators">
            <h3>Creators</h3>
            <ul>
                {creators.items.map((creator, index) => (
                    <li key={index} className="modal_creatorItem">
                        {creator.role}: {creator.name}
                    </li>
                ))}
            </ul>
        </div>
    )
);

// Componente para renderizar los personajes del comic
const ComicCharacters = ({ characters }) => (
    characters.length > 0 && (
        <div className="modal_characters">
            <h3>Characters</h3>
            <div className="modal_characters_grid">
                {characters.map((character, index) => (
                    <div key={index} className="modal_character_item">
                        <img 
                            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                            alt={character.name}
                        />
                        <p>{character.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
);

// Componente para renderizar el contenido del comic seleccionado
const SelectedComicContent = ({comic, isFavorited, toggleFavoriteComic, openFavorites, handleSeriesClick}) => {
    return (
        <div className="modal_content_wrapper">
            <ComicImage thumbnail={comic.thumbnail} title={comic.title} />
            <div className='modal_content_container'>
                <ComicHeader 
                    title={comic.title}
                    issueNumber={comic.issueNumber}
                    price={comic.prices[0].price}
                    link={comic.urls[0].url}
                    isFavorited={isFavorited}
                    pages={comic.pageCount}
                    toggleFavoriteComic={toggleFavoriteComic}
                    comic={comic}
                />
                
                <div className="modal_series">
                   <MainButton onClick={handleSeriesClick}>
                   {comic.series.name}
                   </MainButton>
                    {comic.variantDescription && (<div className="modal_series_description">
                        {comic.variantDescription}
                    </div>)}
                </div>


                {comic.description && (
                    <div className="modal_description">
                        {comic.description}
                    </div>
                )}
                <ComicCharacters characters={comic.characters} />
                <ComicCreators creators={comic.creators} />
            </div>
        </div>
    );
};

// Componente para renderizar el modal del comic seleccionado
const SelectedComic = ({selectedComic, setSelectedComic, onClose, toggleFavoriteComic, openFavorites}) => {
    
    
    const [comic, setComic] = useState(null);
    const [seriesData, setSeriesData] = useState(null);
    const [isSeriesModalOpen, setIsSeriesModalOpen] = useState(false);
    const isOpen = selectedComic !== null; // Estado para saber si el modal esta abierto
    const [isVisible, setIsVisible] = useState(false); // Estado para saber si el modal esta visible (diferente por tema de transiciones de css)

    // Si cambia el comic seleccionado, cargamos los datos del comic y sus personajes
    useEffect(() => {
        if (selectedComic) {
            APIConnect.getComic(selectedComic).then(data => {
                APIConnect.getComicCharacters(selectedComic).then(newData => {
                    if (newData.data.results) {
                        setComic({...data.data.results[0], characters: newData.data.results});
                        console.log({...data.data.results[0], characters: newData.data.results});
                    }
                });
            });
        } else {
            setComic(null);
        }
    }, [selectedComic]);

    // Funcion para cerrar el modal
    const handleClose = () => {
        onClose(); // Ejecutamos la funcion recibida por props para hacer la animacion de cierre
        setSelectedComic(null); // Reseteamos el comic seleccionado
        setSeriesData(null); // Reseteamos los datos de la serie
        setIsSeriesModalOpen(false); // Cerramos el submodal de series
    };

    // Funcion para abrir el submodal de series
    const handleSeriesClick = (e) => {
        e.preventDefault();
        if (comic) {
            setIsSeriesModalOpen(true);
            APIConnect.getWithURI(comic.series.resourceURI)
                .then(data => {
                    setSeriesData(data.data.results[0]);
                    console.log(data.data.results[0]);
                });
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleClose} id="selected_comic" setIsVisible={setIsVisible} isVisible={isVisible}>
                {comic ? (
                    <SelectedComicContent 
                        comic={comic} 
                        isFavorited={APIConnect.getLocalFavourites().some(fav => fav.id === comic.id)} 
                        toggleFavoriteComic={toggleFavoriteComic}
                        openFavorites={openFavorites}
                        handleSeriesClick={handleSeriesClick}
                    />
                ) : (
                    <Loader/>
                )}
            </Modal>
            <SeriesModal 
                isOpen={isSeriesModalOpen}
                series={seriesData} 
                onClose={() => {setSeriesData(null); setIsSeriesModalOpen(false);}} 
            />
        </>
    );
};

// Exportamos el componente modal unicamente
export default SelectedComic;


// Exportamos unicamente los componentes de imagenes y creadores para reutilizarlos en el modal de series
export {ComicCreators, ComicImage}
