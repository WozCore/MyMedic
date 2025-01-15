import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CardsCSS/ProductDetail.css";

interface Product {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  weight: string;
  dimensions: string;
  article: string;
  availability: boolean;
  images: { id: string; imageUrl: string }[];
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [visibleThumbnails, setVisibleThumbnails] = useState<number[]>([0, 3]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5103/api/products/GetById?id=${id}`
        );
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.images[0]?.imageUrl || null);
      } catch (error) {
        console.error("Ошибка загрузки данных о продукте:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleThumbnailClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleNextThumbnails = () => {
    if (product) {
      const maxIndex = product.images.length;
      if (visibleThumbnails[1] < maxIndex) {
        setVisibleThumbnails([visibleThumbnails[0] + 1, visibleThumbnails[1] + 1]);
      }
    }
  };

  const handlePreviousThumbnails = () => {
    if (visibleThumbnails[0] > 0) {
      setVisibleThumbnails([visibleThumbnails[0] - 1, visibleThumbnails[1] - 1]);
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (!product) return <p>Продукт не найден.</p>;

  return (
    <div className="product-detail-container">
      <div className="product-content">
        <div className="product-images">
          <div className="main-image-container">
            <img
              src={`http://localhost:5103/images/products/${selectedImage}`}
              alt={product.productName}
              className="main-product-image"
            />
          </div>
          {product.images.length>1 && (
          <div className="thumbnail-container">
            <div className="thumbnail-slider">
            {product.images.map((image) => (
                  <img
                    key={image.id}
                    src={`http://localhost:5103/images/products/${image.imageUrl}`}
                    alt="Thumbnail"
                    className={`thumbnail-image ${
                      selectedImage === image.imageUrl ? "selected" : ""
                    }`}
                    onClick={() => handleThumbnailClick(image.imageUrl)}
                  />
                ))}
            </div>
          </div>
)}

    
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.productName}</h1>
          <p className="product-article">Артикул: {product.article}</p>
          <p className="product-description">{product.productDescription}</p>
          <p className="product-price">Цена: <span>{product.productPrice} сом</span></p>
          <p className="product-weight">Вес: <span>{product.weight}</span></p>
          <p className="product-dimensions">Размеры: <span>{product.dimensions}</span></p>
          <p className="product-availability">
            Статус: <span>{product.availability ? "В наличии" : "Нет в наличии"}</span>
          </p>
          <button className="add-to-cart-btn">В КОРЗИНУ</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
