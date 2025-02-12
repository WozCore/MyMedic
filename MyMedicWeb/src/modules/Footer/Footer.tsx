import React from "react";
import "./Footer.css";
import logoMain from "../../assets/logoMain.png";
import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaInstagram,
    FaTelegramPlane,
    FaPhone,
    FaEnvelope,
    FaWhatsapp,
} from "react-icons/fa";
import { PATH } from "../../utis/Constants";

export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <img src={logoMain} alt="Logo" className="footer-logo" />
                </div>
                <nav className="footer-nav">
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
                <div className="footer-column">
                    <h4>Социальные сети</h4>
                    <div className="footer-social">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="https://whatsapp.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaWhatsapp />
                        </a>
                        <a
                            href="https://t.me/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaTelegramPlane />
                        </a>
                    </div>
                </div>
                <div className="f">
                    <h4 className="footerHeading">Контакты</h4>
                    <p>
                        <FaPhone className="icon" /> +996 (999) 99-99-99
                    </p>
                    <p>
                        <FaEnvelope className="icon" /> info@example.com
                    </p>
                </div>
            </div>
        </footer>
    );
};
