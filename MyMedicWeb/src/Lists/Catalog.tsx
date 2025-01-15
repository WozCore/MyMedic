import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // Для получения id из URL
import CategoryCard from '../Cards/CategoryCard'; // Карточка категории
import './ListsCSS/Catalog.css'
import ProductCard from '../Cards/ProductCard';
const Catalog = () => {
  const { id } = useParams<{ id: string }>();  // Получаем id из URL
  const location = useLocation();
  const [categories, setCategories] = useState<any[]>([]); // Дочерние категории
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const categoryTitle = location.state?.title || "Категория";
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isProductList, setIsProductList] = useState(false);
  const [hasSubcategories, setHasSubcategories] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5103/api/categories/getByParentId?parentId=${id}`
        );
        const data = await response.json();

        if (data.length === 0) {
          // Если нет дочерних категорий, загружаем товары
          const productResponse = await fetch(
            `http://localhost:5103/api/products/getByCategory?categoryId=${id}`
          );
          const productData = await productResponse.json();
          setItems(productData.items);
          setIsProductList(true);
        } else {
          setItems(data);
          setIsProductList(false);
        }

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
        <h1 className='title'>{categoryTitle}</h1>
      {isProductList ? (
           <section className="catalog">
        <div className="card-container">
          {items.map((item: any) => (
            <ProductCard
            key={item.id}
              id={item.id}
              productName={item.productName}
              productDescription={item.productDescription}
              productPrice={item.productPrice}
              images={item.images}
            />
          ))}
        </div>
        </section>
      ) : (
        <section className="catalog">
        <div className="card-container">
          {items.map((item: any) => (
            <CategoryCard
              key={item.id}
              id={item.id}
              title={item.categoryName}
              imageUrl={item.images[0]?.imageUrl || "default-placeholder.png"}
            />
          ))}
        </div>
        </section>
      )}
    </div>
  );
};

export default Catalog;
