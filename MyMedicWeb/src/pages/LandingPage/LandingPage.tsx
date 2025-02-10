import React from "react";
import "./LandingPage.css";
import mainImg from "../../assets/mainImg.png";
import doc1 from "../../assets/doc1.png";
import doc2 from "../../assets/doc2.png";
import doc3 from "../../assets/doc3.png";
import doc4 from "../../assets/doc4.png";
import doc5 from "../../assets/doc5.png";
import star from "../../assets/star.png";
import emptyStar from "../../assets/emptyStar.png";
import { reviews } from "../../utis/Constants";

const LandingPage: React.FC = () => {
    return (
        <div className="mainContainer">
            <div className="mainTextBlock">
                <div className="mainText">
                    <h1 className="medicineText">
                        Медицина — это наука, котору нужно изучать руками!
                    </h1>
                    <h4 className="medicineTextSmall">
                        От скелетов до органов — всё для медицинского
                        образования и научных исследований.
                    </h4>
                    <button className="seeCatalogBtn">
                        Посмотреть каталог
                    </button>
                </div>
                <div className="firstImgBlock">
                    <img src={mainImg} className="main-product-image" />
                </div>
            </div>
            <div className="mainTextAboutBlock">
                <div className="mainTextAbout">
                    <h2 className="aboutText">
                        Мы более 12 лет поставляем анатомические модели и
                        учебные пособия для студентов, преподавателей и
                        медучреждений. Надежность, точность и качество — то, за
                        что нас выбирают. Быстрая доставка и профессиональная
                        поддержка гарантированы.
                    </h2>
                    <div className="line" />
                    <div className="timeWrapperBlock">
                        <div className="timeWrapper1">
                            <h2 className="number">12 лет</h2>
                            <h3 className="numberDesc">работы</h3>
                        </div>
                        <div className="timeWrapper1">
                            <h2 className="number">10 000+</h2>
                            <h3 className="numberDesc">довольных клиентов</h3>
                        </div>
                    </div>
                </div>
                <div className="images2layers">
                    <img src={doc1} className="doc1img" />
                    <img src={doc2} className="doc2img" />
                </div>
            </div>
            <div className="mainTextBlock2">
                <div className="imgBig">
                    <img src={doc3} className="doc1img" />
                </div>
                <div className="twoImages">
                    <img src={doc4} className="doc1img" />
                    <img src={doc5} className="doc2img" />
                </div>
            </div>
            <button className="seeCatalogBtn2">Посмотреть каталог</button>
            <div className="reviewsBlock">
                <h5 className="reviewText">Отзывы</h5>
                <div className="reviewCardsContainer">
                    {reviews.map((review, index) => (
                        <div className="reviewCard" key={index}>
                            <div className="reviewTextCard">
                                <div>
                                    <img
                                        src={review.peopleImg}
                                        className="peopleImg"
                                        alt="Reviewer"
                                    />
                                </div>
                                <h4 className="review">“{review.review}”</h4>
                                <div className="line2" />
                                <h4 className="reviewerName">
                                    {review.reviewerName}
                                    <div className="starsBlock">
                                        {Array.from(
                                            { length: 5 },
                                            (_, index) => (
                                                <img
                                                    key={index}
                                                    src={
                                                        index < review.rating
                                                            ? star
                                                            : emptyStar
                                                    }
                                                    className="starImg"
                                                    alt={`star-${index}`}
                                                />
                                            )
                                        )}
                                    </div>
                                </h4>
                                <h4 className="reviewerJob">
                                    {review.reviewerJob}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
