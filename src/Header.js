import React from 'react'
import "./Header.css"
import SearchIcon from '@mui/icons-material/Search';


function Header() {
  return (
    <div>
  <img
          className="header__logo"
          src=""
        />


       <div className="header__search">
        <input className="header__searchInput" type="text" placeholder="Type name of research paper" />
        <SearchIcon className="header__searchIcon" />
      </div>

    </div>
  
       
  )
}

export default Header