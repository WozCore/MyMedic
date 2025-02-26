import React, { useEffect, useState } from "react";
import "./Cart.css";
import { Product } from "../../pages/CatalogPage/store/useCatalogPage";

interface CartProps {
    showBasket: boolean;
    setShowBasket: (show: boolean) => void;
    basketItems: Product[];
    setBasketItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const Cart: React.FC<CartProps> = ({
    showBasket,
    setShowBasket,
    basketItems,
    setBasketItems,
}) => {
    const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setBasketItems(JSON.parse(savedCart));
        }
    }, [setBasketItems]);

    const decreaseCount = (productId: string) => {
        setItemCounts((prev) => ({
            ...prev,
            [productId]: Math.max((prev[productId] || 1) - 1, 1),
        }));
    };

    const increaseCount = (productId: string) => {
        setItemCounts((prev) => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1,
        }));
    };

    const getProductWord = (count: number) => {
        if (count % 10 === 1 && count % 100 !== 11) {
            return "товар";
        } else if (
            [2, 3, 4].includes(count % 10) &&
            ![12, 13, 14].includes(count % 100)
        ) {
            return "товара";
        } else {
            return "товаров";
        }
    };

    if (!showBasket) return null;

    return (
        <div className="basketContainer">
            <div className="basketHeader">
                <h2>Отложенные товары</h2>
                <h3>
                    {basketItems.length} {getProductWord(basketItems.length)}
                </h3>
                <button
                    className="clearBasket"
                    onClick={() => {
                        if (
                            window.confirm(
                                "Вы уверены, что хотите очистить корзину?"
                            )
                        ) {
                            setBasketItems([]);
                            localStorage.removeItem("cart");
                        }
                    }}
                >
                    <span className="clearIcon">&times;</span>{" "}
                    <p className="clearText">Очистить корзину</p>
                </button>
                <span
                    className="clearIconBig"
                    onClick={() => {
                        setShowBasket(false);
                    }}
                >
                    &times;
                </span>
            </div>

            {basketItems.length > 0 ? (
                basketItems.map((item) => (
                    <div key={item.id} className="basketItem">
                        <div className="basketImgDiv">
                            <img
                                src={item.images?.[0]?.imageUrl || ""}
                                className="basketImage"
                                alt={item.productName}
                            />
                        </div>
                        <div className="basketDetails">
                            <p className="basketTitle">{item.productName}</p>
                            <p className="basketDesc">
                                {item.productDescription}
                            </p>
                            <p className="basketPrice">
                                {item.productPrice} сом
                            </p>
                            <div className="counterDiv">
                                <button
                                    className="counterBtn"
                                    onClick={() => decreaseCount(item.id)}
                                >
                                    -
                                </button>
                                <span className="counter-text">
                                    {itemCounts[item.id] || 1}
                                </span>
                                <button
                                    className="counterBtn"
                                    onClick={() => increaseCount(item.id)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="emptyCart">Корзина пуста</p>
            )}
        </div>
    );
};
