import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <div>
        <section className="main">
            <h1>
                <span className="highlight">MyMedic</span> - Ваш надежный онлайн-магазин медицинских товаров в Бишкеке.
            </h1>
            <h5>
                Широкий ассортимент продукции для врачей и студентов-медиков: хирургические наборы, анатомические модели, 
                муляжи органов и другие пособия для обучения, расходники
            </h5>
            <div className="buttons">
                <button className="catalog-btn">Каталог </button>
                <button className="contact-btn">Свяжитесь с нами </button>
            </div>
        </section>
        <section>
            <h1>
                Популярные категории
            </h1>
        </section>
        </div>
    );
}

export default Hero;
