import React, {useRef, useEffect} from 'react'
import Comic from './Comic'
import Loader from './UI/Loader'
import { APIConnect } from '../functions';


const Comics = ({comics, selectedComic, setSelectedComic, toggleFavoriteComic, loading, setOffset}) => {

    const offsetRef = useRef(); // Referencia para el offset
   
    useEffect(() => {
        const observer = new IntersectionObserver( // Observador para detectar si el usuario está viendo el último comic
            ([entry]) => {
                if (entry.isIntersecting) {
                    setOffset(prevOffset => prevOffset + 10); // Si el usuario está viendo el último comic, aumentamos el offset
                }
            },
            { threshold: 1.0 }
        );

        if (offsetRef.current) { // Si el offset existe
            observer.observe(offsetRef.current); // Observamos el offset
        }

        return () => {
            if (offsetRef.current) { // Si el offset existe
                observer.unobserve(offsetRef.current); // Y el componente se destruye, eliminamos el observador
            }
        };
    }, []);



    // Si está cargando, mostramos el loader
    
    if (loading) { 
        return (
            <div className='loader_wrapper_comics'><Loader /></div>
        )
    } 

    // Si no está cargando y no hay comics, mostramos el mensaje de no comics
    else if (!loading && (!comics || comics.length === 0)) { 
        return (
            <div className="no-results">No comics found</div>
        )
    }


    // Si no está cargando y hay comics, mostramos todos los comics cargados
    return (
    <>
        <div className='grid_comics'>
            {comics.map((comic)=>(

                <Comic 
                toggleFavoriteComic={toggleFavoriteComic} 
                comic={comic} 
                key={comic.id} 
                isFavorited={APIConnect.getLocalFavourites().some(fav => fav.id === comic.id)} 
                setSelectedComic={setSelectedComic} />

            ))}
        </div>
            <div className='comics_offset' ref={offsetRef}></div>
     </>
    )
}

export default Comics
