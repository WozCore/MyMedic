import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CardsCSS/ProductDetail.css";

interface Product {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  images: { id: string; imageUrl: string }[];
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5103/api/products/GetById?id=${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Ошибка загрузки данных о продукте:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (!product) return <p>Продукт не найден.</p>;

  return (
    <div className="product-detail">
      <h1>{product.productName}</h1>
      <p>{product.productDescription}</p>
      <p>Цена: {product.productPrice} сом</p>
      <div className="product-images">
        {product.images.map((image) => (
          <img
            key={image.id}
            src={`http://localhost:5103/images/products/${image.imageUrl}`}
            alt={product.productName}
            className="product-image"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
