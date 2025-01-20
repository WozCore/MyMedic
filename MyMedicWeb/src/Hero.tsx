import React from 'react';
import './Hero.css';
import Header from './Header';
import logo from './assets/logo.png'
import CatalogMainList from './Lists/CatalogMainList';
interface Item {
    id: number;
    title: string;
    imageUrl: string;
}

function Hero() {
    const items: Item[] = [
        { id: 1, title: "Кардиология", imageUrl: "https://via.placeholder.com/200" },
        { id: 2, title: "Хирургия", imageUrl: "https://via.placeholder.com/200" },
        { id: 3, title: "Анатомия", imageUrl: "https://via.placeholder.com/200" },
        { id: 4, title: "Диагностика", imageUrl: "https://via.placeholder.com/200" },
        { id: 5, title: "Терапия", imageUrl: "https://via.placeholder.com/200" },
    ];
    return (
        
        <div className='heroMain'>
         <Header showLogo={false} />
        <section className="main">
            <img className='logo' src={logo} alt='logo'></img>
            <h1 className='hero'>
                
                <span className="highlight">MyMedic</span> 
               
            </h1>
          <h3 className='miniSection'>

         
           <span className="mini"> Ваш надежный магазин медицинских товаров в Бишкеке.
           </span>
           </h3>
          
            <div className="buttons">
                <button className="catalog-btn">Каталог </button>
                <button className="contact-btn">Свяжитесь с нами </button>
            </div>
        </section>
        <section className='delieverySection'>
            <h1 className='delievery'>
                Доставка по всем регионам Кыргызстана
            </h1>
            <h5>
                Широкий ассортимент продукции для врачей и студентов-медиков: хирургические наборы, расходники, анатомические модели, 
                муляжи органов и другие пособия для обучения
            </h5>
           
        </section>
        <section>
            <CatalogMainList/>
        </section>
        </div>
    );
}

export default Hero;
