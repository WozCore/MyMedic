import React, { useState } from "react";
import "./UserAccountPage.css";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../utis/Constants";

export const UserAccountPage: React.FC = () => {
    const navigate = useNavigate();
    const storedData = JSON.parse(localStorage.getItem("userData") || "{}");

    const [formData, setFormData] = useState({
        firstName: storedData.firstName || "",
        lastName: storedData.lastName || "",
        email: storedData.email || "",
        phone: storedData.phone || "",
        gender: storedData.gender || "male",
        profileImage: storedData.profileImage || null,
    });

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate(PATH.login);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    profileImage: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        localStorage.setItem("userData", JSON.stringify(formData));
        alert("Данные сохранены!");
    };

    return (
        <div className="account-page">
            <header className="account-header">
                <h2 className="myAccountTitle">Мой Аккаунт</h2>
            </header>

            <div className="account-container">
                <div className="account-sidebar">
                    <button className="account-btn">
                        Персональная информация
                    </button>
                    <button className="account-btn otherButtons">
                        Мои покупки
                    </button>
                    <button className="account-btn otherButtons">
                        Способы оплаты
                    </button>
                    <button
                        className="account-btn otherButtons"
                        onClick={() => navigate("/landing")}
                    >
                        На главную
                    </button>

                    <button
                        className="account-btn otherButtons"
                        onClick={handleLogout}
                    >
                        Выйти
                    </button>
                </div>

                <div className="account-content">
                    <div className="profile-section">
                        <div className="profile-image">
                            <input
                                type="file"
                                id="fileUpload"
                                accept="image/*"
                                onChange={handleImageUpload}
                                hidden
                            />
                            <label htmlFor="fileUpload" className="upload-area">
                                {formData.profileImage ? (
                                    <img
                                        src={formData.profileImage}
                                        alt="Profile"
                                        className="profile-img"
                                    />
                                ) : (
                                    <div className="upload-placeholder">
                                        Загрузить фото
                                    </div>
                                )}
                            </label>
                        </div>

                        <div className="profile-details">
                            <div className="userNameContainer">
                                <div className="userNameBlock">
                                    <label>Имя</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="userNameinput"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="userNameBlock">
                                    <label>Фамилия</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="userNameinput"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <label>Телефон</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            <button className="save-btn" onClick={handleSave}>
                                Сохранить данные
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
