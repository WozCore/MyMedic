import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import CategoryCard from "../Cards/CategoryCard";
import ProductCard from "../Cards/ProductCard";
import "./ListsCSS/Catalog.css";
import Header from "../modules/Header/Header";
const Catalog = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [categories, setCategories] = useState<any[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([]); // Для хлебных крошек
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState([]);
  const [isProductList, setIsProductList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Получение дочерних категорий или товаров
        const response = await fetch(
          `http://localhost:5103/api/categories/getByParentId?parentId=${id}`
        );
        const data = await response.json();

        if (data.length === 0) {
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

        // Получение цепочки родительских категорий
        const breadcrumbsResponse = await fetch(
          `http://localhost:5103/api/categories/getCategoriesLinkList?parentId=${id}`
        );
        const breadcrumbsData = await breadcrumbsResponse.json();
        setBreadcrumbs(breadcrumbsData.reverse()); // Переворачиваем массив
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Неизвестная ошибка");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Устанавливаем заголовок страницы
  useEffect(() => {
    if (breadcrumbs.length > 0) {
      const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1]; // Последний элемент массива
      document.title = lastBreadcrumb.name;
    } else {
      document.title = "Каталог"; // Значение по умолчанию
    }
  }, [breadcrumbs]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
        <Header showLogo={true} />
      {/* Хлебные крошки */}
      <nav className="breadcrumbs">
        <Link to="/">Главное</Link>
        {"   /   "}
        <Link to="/catalog">Каталог</Link>
        {breadcrumbs.map((breadcrumb: any, index) => (
          <React.Fragment key={breadcrumb.id}>
            {"   /   "}
            <Link to={`/catalog/${breadcrumb.id}`}>{breadcrumb.name}</Link>
          </React.Fragment>
        ))}
      </nav>

      <h1 className="title">
        {breadcrumbs[breadcrumbs.length - 1]?.name || "Категория"}
      </h1>

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
