import MainButton from './UI/MainButton';

// ... in your header component
<div className="header_content">
  <button className="selector_mode" onClick={handleModeChange}>
    {mode === 'grid' ? 'List View' : 'Grid View'}
  </button>
  <MainButton onClick={handleFavoritesClick}>
    Favorites
  </MainButton>
</div> 