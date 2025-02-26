import { Link, useNavigate } from "react-router-dom";
import logoMain from "../../assets/logoMain.png";
import { PATH } from "../../utis/Constants";
import { FaHeart, FaRegHeart, FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import basket from "../../assets/busket.png";
import "./CatalogPage.css";
import React, { useEffect, useRef, useState } from "react";
import { CustomPagination } from "./ui/CustomPagination";
import { Product, useCatalogStore } from "./store/useCatalogPage";
import { categories } from "../../utis/Constants";
import img from "../../assets/heart.png";
import { Cart } from "../../modules/Cart/Cart";

const CatalogPage: React.FC = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const { data, fetchData, loading, error } = useCatalogStore();
    const searchRef = useRef<HTMLDivElement>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [basketItems, setBasketItems] = useState<Product[]>([]);
    const [showBasket, setShowBasket] = useState(false);
    const [favorites, setFavorites] = useState<string[]>([]);
    // const [showFavorites, setShowFavorites] = useState(false);

    const toggleFavorite = (productId: string) => {
        setFavorites((prevFavorites: string[]) => {
            const updatedFavorites = prevFavorites.includes(productId)
                ? prevFavorites.filter((id) => id !== productId)
                : [...prevFavorites, productId];

            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            fetchData();
        }
    }, [selectedCategory]);

    const products = data?.items || [];
    const filteredProducts = products.filter(
        (product) =>
            (selectedCategory === null ||
                product.productCategoryId === selectedCategory) &&
            product.productName
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
    );

    const productsPerPage = 6;
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (page - 1) * productsPerPage,
        page * productsPerPage
    );
    const handleSearch = () => {
        setSearchQuery(searchTerm);
        setPage(1);
    };
    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(
            categoryId === selectedCategory ? null : categoryId
        );
        setPage(1);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsFocused(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        if (searchTerm === "") {
            setSearchQuery("");
        }
    }, [searchTerm]);
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setBasketItems(JSON.parse(savedCart));
        }
    }, []);

    const addToBasket = (product: Product) => {
        setBasketItems((prev) => {
            const exists = prev.some((item) => item.id === product.id);
            if (!exists) {
                const updatedBasket = [...prev, product];
                localStorage.setItem("cart", JSON.stringify(updatedBasket));
                alert("Товар добавлен в корзину!");
                return updatedBasket;
            }
            return prev;
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                showBasket &&
                !document
                    .querySelector(".basketContainer")
                    ?.contains(event.target as Node) &&
                !document
                    .querySelector(".iconButton img")
                    ?.contains(event.target as Node)
            ) {
                setShowBasket(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showBasket]);

    return (
        <div className="catalogContainer">
            <h1 className="titleCatalog">Каталог товаров</h1>
            <div className="headerDiv">
                <Link to={PATH.landing} className="headerLogo">
                    <img src={logoMain} alt="Logo" />
                </Link>
                <div className="searchDiv">
                    <div ref={searchRef} className="search-container">
                        {!isFocused && !searchTerm && (
                            <FiSearch className="search-icon" />
                        )}
                        <input
                            type="text"
                            className="search-input"
                            value={searchTerm}
                            onFocus={() => setIsFocused(true)}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            className="search-button"
                            onClick={handleSearch}
                        >
                            Поиск
                        </button>
                    </div>

                    <button
                        className="iconButton"
                        onClick={() => setShowBasket(!showBasket)}
                    >
                        <img src={basket} className="basketImg" alt="Cart" />
                    </button>
                    <button
                        className="iconButton"
                        onClick={() => navigate("/useraccount")}
                    >
                        <FaRegHeart color="#9747FF" />
                    </button>
                    <button
                        className="iconButton"
                        onClick={() => navigate("/useraccount")}
                    >
                        <FaUser />
                    </button>
                </div>
            </div>

            <div className="catalogNav">
                <ul className="navList">
                    <li
                        className="navName"
                        onClick={() => setSelectedCategory(null)}
                        style={{ cursor: "pointer" }}
                    >
                        Категории
                    </li>
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className={`navItem ${
                                selectedCategory === category.id ? "active" : ""
                            }`}
                            onClick={() => handleCategoryClick(category.id)}
                            style={{ cursor: "pointer" }}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>

                <div className="catalogPagination">
                    {loading ? (
                        <p>Загрузка...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : (
                        <>
                            <div className="catalogCards">
                                {paginatedProducts.length > 0 ? (
                                    paginatedProducts.map(
                                        (product: Product) => (
                                            <div
                                                className="card"
                                                key={product.id}
                                            >
                                                <div className="imageContainer">
                                                    <img
                                                        src={img}
                                                        className="imageCatal"
                                                        alt={
                                                            product.productName
                                                        }
                                                    />
                                                    <button
                                                        className="heartIcon"
                                                        onClick={() =>
                                                            toggleFavorite(
                                                                product.id
                                                            )
                                                        }
                                                    >
                                                        {favorites.includes(
                                                            product.id
                                                        ) ? (
                                                            <FaHeart color="red" />
                                                        ) : (
                                                            <FaRegHeart color="black" />
                                                        )}
                                                    </button>
                                                </div>

                                                <p className="title">
                                                    {product.productName}
                                                </p>
                                                <p className="descr">
                                                    {product.productDescription}
                                                </p>
                                                <p className="price">
                                                    {product.productPrice} сом
                                                </p>
                                                <div className="orderBtnDiv">
                                                    <button
                                                        className="orderBtn"
                                                        onClick={() =>
                                                            addToBasket(product)
                                                        }
                                                    >
                                                        Добавить в заказ
                                                    </button>

                                                    <button
                                                        className="iconButton"
                                                        onClick={() =>
                                                            navigate("/cart")
                                                        }
                                                    >
                                                        <img
                                                            src={basket}
                                                            className="basketImg"
                                                            alt="Cart"
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <p className="no-results">
                                        Нет результатов
                                    </p>
                                )}
                            </div>

                            {totalPages > 1 && (
                                <div className="pagination">
                                    <CustomPagination
                                        totalPages={totalPages}
                                        currentPage={page}
                                        onPageChange={setPage}
                                    />
                                </div>
                            )}
                            {showBasket && (
                                <Cart
                                    basketItems={basketItems}
                                    setShowBasket={setShowBasket}
                                    showBasket={showBasket}
                                    setBasketItems={setBasketItems}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default CatalogPage;
