import React, { useState } from "react";
import "./UserAccountPage.css";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../utis/Constants";
import { UserAccount } from "../../modules/UserAccount/UserAccount";
import { MyBasket } from "../../modules/MyBasket/MyBasket";
import { AddressManagement } from "../../modules/AddressManagement/AddressManagement";
import { PaymentMethods } from "../../modules/PaymentMethods/PaymentMethods";
import { ChangePassword } from "../../modules/ChangePassword/ChangePassword";

export const UserAccountPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<
        "account" | "basket" | "address" | "payment" | "password"
    >("account");

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate(PATH.landing);
    };

    const getTitle = () => {
        switch (activeSection) {
            case "account":
                return "Мой Аккаунт";
            case "basket":
                return "Мои покупки";
            case "address":
                return "Мои адреса";
            case "payment":
                return "Способы оплаты";
            case "password":
                return "Изменить пароль";
            default:
                return "Мой Аккаунт";
        }
    };

    return (
        <div className="account-page">
            <header className="account-header">
                <h2 className="myAccountTitle">{getTitle()}</h2>
            </header>
            <div className="account-container">
                <div className="account-sidebar">
                    <button
                        className={`account-btn ${
                            activeSection === "account" ? "active" : ""
                        }`}
                        onClick={() => setActiveSection("account")}
                    >
                        Персональная информация
                    </button>
                    <button
                        className={`account-btn otherButtons ${
                            activeSection === "basket" ? "active" : ""
                        }`}
                        onClick={() => setActiveSection("basket")}
                    >
                        Мои покупки
                    </button>
                    <button
                        className={`account-btn otherButtons ${
                            activeSection === "address" ? "active" : ""
                        }`}
                        onClick={() => setActiveSection("address")}
                    >
                        Управление адресом
                    </button>
                    <button
                        className={`account-btn otherButtons ${
                            activeSection === "payment" ? "active" : ""
                        }`}
                        onClick={() => setActiveSection("payment")}
                    >
                        Способы оплаты
                    </button>
                    <button
                        className={`account-btn otherButtons ${
                            activeSection === "password" ? "active" : ""
                        }`}
                        onClick={() => setActiveSection("password")}
                    >
                        Изменить пароль
                    </button>

                    <button
                        className="account-btn otherButtons"
                        onClick={handleLogout}
                    >
                        Выйти
                    </button>
                </div>

                <div className="account-content">
                    {activeSection === "account" && <UserAccount />}
                    {activeSection === "basket" && <MyBasket />}
                    {activeSection === "address" && <AddressManagement />}
                    {activeSection === "payment" && <PaymentMethods />}
                    {activeSection === "password" && <ChangePassword />}
                </div>
            </div>
        </div>
    );
};
