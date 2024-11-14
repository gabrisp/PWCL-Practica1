import React from 'react';

const MainButton = ({ children, onClick, className }) => (
    <button 
      className={`main_btn ${className || ''}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );

export default MainButton; 