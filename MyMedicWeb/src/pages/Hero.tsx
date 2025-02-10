import React from "react";
import "./Hero.css";
import logo from "../assets/logo.png";
import CatalogMainList from "../Lists/CatalogMainList";

const Hero: React.FC = () => {
    return (
        <div className="heroMain">
            <section className="main">
                <img className="logo" src={logo} alt="MyMedik Logo" />
                <h1 className="hero">
                    <span className="highlight">MyMedik</span>
                </h1>
                <h3 className="miniSection">
                    <span className="mini">
                        Ваш надежный магазин медицинских товаров в Бишкеке.
                    </span>
                </h3>

                <div className="buttons">
                    <button className="catalog-btn">Каталог</button>
                    <button className="contact-btn">Свяжитесь с нами</button>
                </div>
            </section>

            <section className="deliverySection">
                <h1 className="delivery">
                    Доставка по всем регионам Кыргызстана
                </h1>
                <h5>
                    Широкий ассортимент продукции для врачей и
                    студентов-медиков: хирургические наборы, расходники,
                    анатомические модели, муляжи органов и другие пособия для
                    обучения.
                </h5>
            </section>

            <section>
                <CatalogMainList />
            </section>
        </div>
    );
};

export default Hero;
