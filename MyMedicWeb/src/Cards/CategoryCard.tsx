import React from 'react';
import './CardsCSS/CategoryCard.css';
import { useNavigate } from 'react-router-dom';
interface CategoryCardProps{
    id: string;
    imageUrl: string;
    title: string;
}
const CategoryCard: React.FC<CategoryCardProps> = ({id, imageUrl, title }) => {
    const navigate = useNavigate(); 
    const handleClick = () => {
        console.log(`Категория: ${title}`);
        navigate(`/catalog/${id}`, { state: { title } });
      };
    return (
        <div className="card" onClick={handleClick}>
            <div className="card-image-container">
            <img src={`http://localhost:5103/images/products/${imageUrl}`}  alt={title} className="card-image" />
            </div>
            <div className="card-title">
                <h3 >{title}</h3>
            </div>
        </div>
    );
};
export default CategoryCard;

