import React from 'react';
import './CardsCSS/CategoryCard.css';
import image from '../assets/heart.png'
interface CategoryCardProps{
    imageUrl: string;
    title: string;
}
const CategoryCard: React.FC<CategoryCardProps> = ({ imageUrl, title }) => {
    return (
        <div className="card">
            <div className="card-image-container">
                <img src={image} alt={title} className="card-image" />
            </div>
            <div className="card-title">
                <h3>{title}</h3>
            </div>
        </div>
    );
};
export default CategoryCard;
