import React, { useState } from "react";
import "./Login.css";
import logoMain from "../../assets/logoMain.png";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../utis/Constants";
import { useLogInStore } from "./store/useLogInStore";

export const LogIn: React.FC = () => {
    const navigate = useNavigate();
    const { loginUser, isLoading, error } = useLogInStore();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await loginUser(formData.email, formData.password, () =>
            navigate(PATH.landing)
        );

        if (!success) {
            alert("Ошибка входа. Проверьте данные и попробуйте снова.");
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
                    Войдите в аккаунт, чтобы получить{" "}
                    <span style={{ color: "#9258FF" }}>доступ к нашему</span>{" "}
                    сервису
                </h1>
            </div>
            <form className="signInBlock2" onSubmit={handleSubmit}>
                <h3 className="registerSignIn">Войти</h3>
                <div className="inputBlocks">
                    <h4 className="inputTextName">E-mail</h4>
                    <input
                        type="email"
                        name="email"
                        className="input"
                        value={formData.email}
                        onChange={handleChange}
                    />
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
                </div>

                {error && <p className="errorText">{error}</p>}

                <div className="buttonsSubmit">
                    <Link to={PATH.signup} className="changeAuthTypeLogin">
                        Регистрация
                    </Link>
                    <button
                        type="submit"
                        className="submitButton"
                        disabled={isLoading}
                    >
                        {isLoading ? "Вход..." : "Войти"}
                    </button>
                </div>
            </form>
        </div>
    );
};
