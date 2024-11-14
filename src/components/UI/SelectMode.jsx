import React, { useEffect } from 'react';

const SelectMode = ({ mode, setMode }) => {

    useEffect(() => {
        const gridComics = document.querySelector('.grid_comics'); // Seleccionamos el contenedor de los comics
        if (gridComics) { // Si existe (aseguramos por errores)
            if (mode === 0) { // Si es 0, añadimos clase
                gridComics.classList.add('--detailed-grid');
            } else { // Si no eliminamos
                gridComics.classList.remove('--detailed-grid');
            }
        }
    }, [mode]);

    return (
        <div className='selector_wrapper'>
            <button onClick={() => setMode(mode === 0 ? 1 : 0)} className={`selector_mode`}>
                {mode === 0 ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.6 4.6H10v14.8H4.6V4.6zm-1-1H11v16.8H3.6V3.6zm10.4 1h5.4v14.8H14V4.6zm-1-1h7.4v16.8H13V3.6z" />
                    </svg>
                ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="inherit" stroke="inherit">
                        <path fillRule="evenodd" clipRule="evenodd" d="M4.6 4.6H10V10H4.6V4.6zm-1-1H11V11H3.6V3.6zm1 10.4H10v5.4H4.6V14zm-1-1H11v7.4H3.6V13zm15.8-8.4H14V10h5.4V4.6zm-5.4-1h-1V11h7.4V3.6H14zM14 14h5.4v5.4H14V14zm-1-1h7.4v7.4H13V13z" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default SelectMode;
