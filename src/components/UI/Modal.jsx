import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, children, id, setIsVisible, isVisible }) => {

    useEffect(() => {

        if (isOpen) {
            setIsVisible(true); // Hacemos visible el modal
            document.body.classList.add('disable-scroll'); // Deshabilitamos el scroll
        } else {
            document.body.classList.remove('disable-scroll'); // Habilitamos el scroll
            setIsVisible(false); // Hacemos invisible el modal
        }
        return () => document.body.classList.remove('disable-scroll'); // Si se destruye el componente, eliminamos la clase disable-scroll

    }, [isOpen]);


    if (!isOpen) return null; // Si el modal no está abierto, no renderizamos nada

    return (
        <div 
            id={id}
            className={`modal_container ${isVisible ? '--visible' : ''}`} 
            onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                    onClose();
                    }, 500)
                }
            }
        >
            <div 
                className={`modal_content ${isVisible ? '--visible' : ''}`}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal; 