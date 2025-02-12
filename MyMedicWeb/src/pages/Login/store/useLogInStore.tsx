import { create } from "zustand";

interface LogInState {
    isLoading: boolean;
    error: string | null;
    token: string | null;
    loginUser: (
        email: string,
        password: string,
        onSuccess: () => void
    ) => Promise<boolean>;
    logoutUser: () => void;
    checkTokenExpiration: () => void;
}

export const useLogInStore = create<LogInState>((set) => ({
    isLoading: false,
    error: null,
    token: localStorage.getItem("authToken") || null,

    loginUser: async (email, password, onSuccess) => {
        set({ isLoading: true, error: null });

        try {
            const response = await fetch(
                "https://w0zw4ld-001-site1.ktempurl.com/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userEmail: email,
                        userPassword: password,
                    }),
                }
            );
            const data = await response.json();
            if (response.ok) {
                alert("Вход выполнен успешно!");
                localStorage.setItem("authToken", data.token);
                set({ token: data.token, isLoading: false });
                onSuccess();
                return true;
            } else {
                throw new Error(data.message || "Ошибка входа");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                set({ error: error.message, isLoading: false });
            } else {
                set({
                    error: "Произошла неизвестная ошибка",
                    isLoading: false,
                });
            }
            return false;
        }
    },
    logoutUser: () => {
        localStorage.removeItem("authToken");
        set({ token: null });
        console.log("🔴 User logged out");
    },
    checkTokenExpiration: () => {
        const token = localStorage.getItem("authToken");
        if (!token) return;
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expiryTime = payload.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expiryTime) {
            useLogInStore.getState().logoutUser();
        }
    },
}));
