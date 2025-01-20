import React, { useState } from 'react';
import './Header.css';
import logo from './assets/logo.png';

// Обновите типы пропсов для компонента
interface HeaderProps {
  showLogo: boolean; // Пропс для управления видимостью логотипа
}

const Header: React.FC<HeaderProps> = ({ showLogo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div className="top">
      <div className="logoContainer">
        <button onClick={toggleMenu} className="burger-button open">
          ☰
        </button>

        {/* Условный рендеринг логотипа, используя пропс showLogo */}
        {showLogo && <img src={logo} alt="Logo" className="logoMain" />}
      </div>
      
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        <button onClick={toggleMenu} className="burger-button close">
          ✖
        </button>

        <img src={logo} alt="Logo1" className="logoOpen" />
        
        <ul className="menu-list">
          <li>Главная</li>
          <li>О нас</li>
          <li>Политика и конфиденциальность</li>
          <li>Каталог</li>
          <li>Прокат</li>
          <li>Статьи</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
