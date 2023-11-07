import React from "react";
import Logo from "../../../assets/projectlogo.png";
import "./Header.css";

function Header() {
    return (
        <div className="w-full flex flex-col justify-center items-center md:items-start">
            <img alt="Header" className="header__logo" width={100} src={Logo} />
        </div>
    );
}

export default Header;
