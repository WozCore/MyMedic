import React, { useState } from "react";
import "./SignIn.css";
import logoMain from "../../assets/logoMain.png";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../utis/Constants";
import { useSignInStore } from "./store/useSignInStore";

export const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const { registerUser, isLoading } = useSignInStore();

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        number: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: "",
        number: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "number" && !/^[0-9]*$/.test(value)) {
            return;
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: "", number: "", password: "" };
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Введите корректный email";
            isValid = false;
        }
        if (formData.number.length < 10) {
            newErrors.number = "Введите корректный номер телефона";
            isValid = false;
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(formData.password)) {
            newErrors.password =
                "Пароль должен содержать минимум 6 символов, включая букву и цифру";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            const fullName = `${formData.name} ${formData.surname}`.trim();

            const success = await registerUser(
                formData.email,
                formData.password,
                fullName,
                () => navigate(PATH.login)
            );

            if (!success) {
                alert("Ошибка регистрации. Попробуйте снова.");
            }
        }
    };

    return (
        <div className="signInContainer">
            <div className="signInBlock1">
                <img
                    src={logoMain}
                    className="logo"
                    alt="Logo"
                    onClick={() => navigate("/landing")}
                />
                <h1 className="mainTextSignIn">
                    Создайте аккаунт, чтобы получить{" "}
                    <span style={{ color: "#9258FF" }}>доступ к нашему</span>{" "}
                    сервису
                </h1>
            </div>
            <form className="signInBlock2" onSubmit={handleSubmit}>
                <h3 className="registerSignIn">Регистрация</h3>
                <div className="nameContainer">
                    <div className="nameBlock">
                        <h4 className="inputTextName">Фамилия</h4>
                        <input
                            type="text"
                            name="surname"
                            className="nameinput"
                            value={formData.surname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="nameBlock">
                        <h4 className="inputTextName">Имя</h4>
                        <input
                            type="text"
                            name="name"
                            className="nameinput"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="inputBlocks">
                    <h4 className="inputTextName">E-mail</h4>
                    <input
                        type="email"
                        name="email"
                        className="input"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <p className="errorText">{errors.email}</p>
                    )}
                </div>
                <div className="inputBlocks">
                    <h4 className="inputTextName">Номер телефона</h4>
                    <input
                        type="text"
                        name="number"
                        className="input"
                        value={formData.number}
                        onChange={handleChange}
                        maxLength={15}
                    />
                    {errors.number && (
                        <p className="errorText">{errors.number}</p>
                    )}
                </div>
                <div className="inputBlocks">
                    <h4 className="inputTextName">Пароль</h4>
                    <input
                        type="password"
                        name="password"
                        className="input"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <p className="errorText">{errors.password}</p>
                    )}
                </div>

                <div className="buttonsSubmit">
                    <Link to={PATH.login} className="changeAuthType">
                        Войти
                    </Link>
                    <button
                        type="submit"
                        className="submitButton"
                        disabled={isLoading}
                    >
                        {isLoading ? "Регистрация..." : "Регистрация"}
                    </button>
                </div>
            </form>
        </div>
    );
};
