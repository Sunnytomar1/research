import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import Logo from './assets/projectlogo.png'

function Header() {
  return (
    <div>
      <img alt="Header" className="header__logo" src={Logo} />

      <div className="header__search">
        <input
          className="header__searchInput"
          type="text"
          placeholder="Type name of research paper"
        />
        <SearchIcon className="header__searchIcon" />
      </div>
    </div>
  );
}

export default Header;
