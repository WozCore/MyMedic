import React from "react";
import "./Header.css";
import logoMain from "../../assets/logoMain.png";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { PATH } from "../../utis/Constants";
import basket from "../../assets/busket.png";

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("authToken");

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate(PATH.login);
    };

    return (
        <header className="header">
            <div className="header-container">
                <Link to={PATH.landing} className="header-logo">
                    <img src={logoMain} alt="Logo" />
                </Link>
                <nav className="header-nav">
                    <Link to={PATH.landing} className="navText">
                        О нас
                    </Link>
                    <Link to={PATH.landing} className="navText">
                        Главное
                    </Link>
                    <Link to={PATH.landing} className="navText">
                        Каталог
                    </Link>
                    <Link to={PATH.landing} className="navText">
                        Контакты
                    </Link>
                </nav>
                <div className="header-actions">
                    {token ? (
                        <button
                            className="register-button"
                            onClick={handleLogout}
                        >
                            Выйти
                        </button>
                    ) : (
                        <button
                            className="register-button"
                            onClick={() => navigate("/signin")}
                        >
                            Зарегистрироваться
                        </button>
                    )}

                    <button
                        className="icon-button"
                        onClick={() => navigate("/cart")}
                    >
                        <img src={basket} className="basketImg" alt="Cart" />
                    </button>

                    <button
                        className="icon-button"
                        onClick={() => navigate("/useraccount")}
                    >
                        <FaUser />
                    </button>
                </div>
            </div>
        </header>
    );
};
