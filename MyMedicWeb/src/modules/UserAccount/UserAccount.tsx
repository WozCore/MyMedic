import React, { useState } from "react";
import "./UserAccount.css";
export const UserAccount = () => {
    const storedData = JSON.parse(localStorage.getItem("userData") || "{}");

    const [formData, setFormData] = useState({
        firstName: storedData.firstName || "",
        lastName: storedData.lastName || "",
        email: storedData.email || "",
        phone: storedData.phone || "",
        gender: storedData.gender || "",
        profileImage: storedData.profileImage || null,
    });

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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        localStorage.setItem("userData", JSON.stringify(formData));
        alert("Данные сохранены!");
    };

    return (
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
                            <label>Фамилия</label>
                            <input
                                type="text"
                                name="lastName"
                                className="userNameInput"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Анарбекова"
                            />
                        </div>
                        <div className="userNameBlock">
                            <label>Имя</label>
                            <input
                                type="text"
                                name="firstName"
                                className="userNameInput"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Мыскал"
                            />
                        </div>
                    </div>

                    <label>Email&#42;</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="@gmail.com"
                    />

                    <label>Телефон</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+996"
                    />
                    <label>Gender&#42;</label>
                    <input
                        type="tel"
                        name="genger"
                        value={formData.gender}
                        onChange={handleChange}
                        placeholder="Жен"
                    />

                    <button className="save-btn" onClick={handleSave}>
                        Сохранить данные
                    </button>
                </div>
            </div>
        </div>
    );
};
