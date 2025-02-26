import { useEffect, useState } from "react";
import { Product } from "../../pages/CatalogPage/store/useCatalogPage";
import "./MyBasket.css";

export const MyBasket = () => {
    const [basketItems, setBasketItems] = useState<Product[]>([]);
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setBasketItems(JSON.parse(savedCart));
        }
    }, []);

    return (
        <div className="basketContainerUser">
            {basketItems.length === 0 ? (
                <p className="emptyBasket">Ваша корзина пуста</p>
            ) : (
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
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
