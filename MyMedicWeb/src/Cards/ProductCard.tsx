import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardsCSS/ProductCard.css";

interface ProductCardProps {
    id: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    images: { id: string; imageUrl: string }[];
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    productName,
    productPrice,
    images,
}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/product/${id}`);
    };

    const imageUrl = images[0]?.imageUrl
        ? `http://localhost:5103/images/products/${images[0].imageUrl}`
        : "https://via.placeholder.com/150";

    return (
        <div className="card" onClick={handleClick}>
            <div className="card-image-container">
                <img src={imageUrl} alt={productName} className="card-image" />
            </div>
            <div className="card-title">
                <h3>{productName}</h3>
            </div>
            <div className="card-price">
                <p>{productPrice} сом</p>
            </div>
        </div>
    );
};

export default ProductCard;
