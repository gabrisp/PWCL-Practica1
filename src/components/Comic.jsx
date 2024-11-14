import React from 'react'
import MainButton from './UI/MainButton';

const Comic = ({comic, setSelectedComic, isFavorited, toggleFavoriteComic}) => (
     
    <div className='comic_wrapper' onClick={()=>setSelectedComic(comic.id)}>
        <div className='comic_img_wrapper'>
                <img className='comic_img' src={comic.thumbnail.path + "." +  comic.thumbnail.extension} />
            <MainButton 
                className={`favorite_button ${isFavorited ? '--active' : ''}`}
                onClick={(e) => {
                    e.stopPropagation(); // Evitamos que el click se propague y, por tanto, se abra el modal
                    console.log(`Clicked ${comic.id}`); 
                    toggleFavoriteComic(comic);
                }}
            >
                {isFavorited ? '★' : '☆'}
            </MainButton>
        </div>
        <div className="comic_data">
            <h3 className='comic_title'>{comic.title}</h3>
        </div>
    </div>
);

export default Comic;
