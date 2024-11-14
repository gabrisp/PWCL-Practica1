import SelectMode from "./SelectMode";
import MainButton from "./MainButton";
import SearchForm from "./SearchForm";

const Header = ({setMode, mode, colorMode, handleColorMode, setFavoritesModalOpen, favoriteComics, searchTerm, setSearchTerm}) => (
    <header>
    <div className="header_content">
      <div className="header_content_left">
        <SelectMode setMode={setMode} mode={mode} />
        <label className="switch">
          <input 
          checked={colorMode === 'dark'}
          type="checkbox" 
          onChange={()=>handleColorMode(colorMode === 'dark' ? 'light' : 'dark')} />
          <span className="slider round"></span>
      </label>
      </div>
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <MainButton onClick={() => setFavoritesModalOpen(true)} className="header_favorite">
         Favorites ({favoriteComics !== null && favoriteComics && (favoriteComics.length)})
      </MainButton>
    </div>
  </header>
  );


export default Header;