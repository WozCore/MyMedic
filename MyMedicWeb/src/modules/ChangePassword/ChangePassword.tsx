import { useState } from "react";
import "./ChangePassword.css";

export const ChangePassword = () => {
    const storedData = JSON.parse(localStorage.getItem("userData") || "{}");

    const [formData, setFormData] = useState({
        firstName: storedData.firstName || "",
        lastName: storedData.lastName || "",
        email: storedData.email || "",
        phone: storedData.phone || "",
        gender: storedData.gender || "",
        profileImage: storedData.profileImage || null,
    });
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
        <div className="changePasswordContainer">
            <div className="changePassBlock">
                <label>Измените пароль</label>
                <input
                    type="text"
                    name="lastName"
                    className="changePassInput"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="3123455423"
                />
            </div>
            <div className="changePassBlock">
                <label>Подтвердите пароль</label>
                <input
                    type="text"
                    name="firstName"
                    className="changePassInput"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="3123455423"
                />
            </div>
            <div className="buttonContainer">
                <button className="savePassChange" onClick={handleSave}>
                    Сохранить данные
                </button>
            </div>
        </div>
    );
};
