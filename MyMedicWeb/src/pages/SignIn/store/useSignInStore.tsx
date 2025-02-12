import { create } from "zustand";

interface SignInState {
    isLoading: boolean;
    error: string | null;
    registerUser: (
        email: string,
        password: string,
        fullName: string,
        onSuccess: () => void
    ) => Promise<boolean>;
}

export const useSignInStore = create<SignInState>((set) => ({
    isLoading: false,
    error: null,

    registerUser: async (email, password, fullName, onSuccess) => {
        set({ isLoading: true, error: null });
        console.log("Sending request:", { email, password, fullName });

        try {
            const response = await fetch(
                "https://w0zw4ld-001-site1.ktempurl.com/api/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userEmail: email,
                        userPassword: password,
                        userFullName: fullName,
                    }),
                }
            );

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (response.ok) {
                console.log("✅ Registration Success:", data);
                alert("Регистрация успешна!");
                onSuccess();
                set({ isLoading: false });
                return true;
            } else {
                throw new Error(data || "Ошибка регистрации");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("❌ Registration Error:", error.message);
                set({ error: error.message, isLoading: false });
            } else {
                console.error("❌ Unknown Error:", error);
                set({
                    error: "Произошла неизвестная ошибка",
                    isLoading: false,
                });
            }
            return false;
        }
    },
}));
