import React, {useState, useEffect} from "react";
import "./ListsCSS/CatalogMainList.css";
import CategoryCard from "../Cards/CategoryCard";
interface Image {
    id: string;
    imageUrl: string;
  }
  interface Category {
    id: string;
    categoryName: string;
    parentCategoryId: string | null;
    images: Image[];
  }
  
function CatalogMainList(){
    const [items, setItems] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        // Функция для получения данных
        const fetchData = async () => {
          try {
            const response = await fetch("http://localhost:5103/api/categories/mainCategories");
            if (!response.ok) {
              throw new Error("Ошибка: ${response.statusText}");
            }
            const data = await response.json();
            setItems(data.result); 
            // Устанавливаем данные из result
            setLoading(false);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Неизвестная ошибка");
            setLoading(false);
          }
        };
        fetchData();
    }, []);
    return (
        <section className="catalog">
          <h3>Популярные категории</h3>
    
          {loading && <p>Загрузка...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
    
          <div className="card-container">
            {items.map((item) => (
              <CategoryCard
                id={item.id}
                title={item.categoryName}
                imageUrl={item.images[0]?.imageUrl || "default-placeholder.png"}
              />
            ))}
          </div>
        </section>
      );
    }
    
    // Карточка категории
    
    
    export default CatalogMainList;