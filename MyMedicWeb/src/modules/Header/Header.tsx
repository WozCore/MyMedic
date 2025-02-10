import React, { useState } from "react";
import "./Header.css";
import logo from "../../assets/logo.png";

interface HeaderProps {
    showLogo?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showLogo = true }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    return (
        <header className="header">
            <div className="header-container">
                <button onClick={toggleMenu} className="burger-button">
                    {isMenuOpen ? "✖" : "☰"}
                </button>

                {showLogo && <img src={logo} alt="Logo" className="logo" />}
            </div>

            <nav className={`menu ${isMenuOpen ? "open" : ""}`}>
                <ul className="menu-list">
                    {[
                        "Главная",
                        "О нас",
                        "Политика и конфиденциальность",
                        "Каталог",
                        "Прокат",
                        "Статьи",
                    ].map((item) => (
                        <li key={item} className="menu-item">
                            {item}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
