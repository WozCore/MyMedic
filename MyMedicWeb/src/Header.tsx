import React, { useState } from 'react';
import './Header.css'; // Импортируем стили для анимации
import logo from "./assets/logo.png"
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Кнопка для открытия меню, расположена в левом верхнем углу */}
      <button onClick={toggleMenu} className="burger-button open">
        ☰
      </button>

      {/* Меню, которое появляется при открытии */}
      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        {/* Кнопка для закрытия меню */}
      
    
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
            <div>
       
            </div>
        
        <div>
        
        </div>
        
      </div>
    </div>
  );
};

export default Header;
