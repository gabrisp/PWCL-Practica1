import React, {useRef, useEffect} from 'react'
import Comic from './Comic'
import Loader from './UI/Loader'
import { APIConnect } from '../functions';
import MainButton from './UI/MainButton';


// Componente para renderizar el grid de comics
const Comics = ({comics, setSelectedComic, toggleFavoriteComic, loading}) => {   

    if (loading) return <div className='loader_wrapper_comics'><Loader /></div>; // Si está cargando, renderizamos el loader
    else if (!comics || comics.length === 0) return <div className="no-results">No comics found</div>; // Si no hay comics, renderizamos un mensaje

    // Si no pasa nada de eso, entonces hay comics y, por tanto, renderizamos el grid
    else return (

                    <div className='grid_comics'>
                        {comics.map((comic) => (
                            <Comic 
                                toggleFavoriteComic={toggleFavoriteComic} 
                                comic={comic} 
                                key={comic.id} 
                                isFavorited={APIConnect.getLocalFavourites().some(fav => fav.id === comic.id)} 
                                setSelectedComic={setSelectedComic} 
                            />
                        ))}

                    </div>
     
                )
}

export default Comics
