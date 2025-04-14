// context/AuthContext.js
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync("token");
                console.log("🟢 SecureStore에서 불러온 토큰:", storedToken);
                if (storedToken) {
                    setToken(storedToken);
                }
            } catch (e) {
                console.error("토큰 로딩 에러:", e);
            } finally {
                setIsLoading(false);
            }
        };

        loadToken();
    }, []);
    // const loadToken = async () => {
    //     const storedToken = await SecureStore.getItemAsync('token');
    //     console.log("🟢 SecureStore에서 불러온 토큰:", storedToken);
    //     if (storedToken) {
    //         setToken(storedToken);  // ✅ 이게 핵심!
    //     }
    //     setIsLoading(false);
    // };
    const savetoken = async (newtoken) => {
        await SecureStore.setItemAsync("token", newtoken);
        setToken(newtoken);
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync("token");
        setToken(null);
    };

    // useEffect(() => {
    //     loadToken();
    // }, []);

    return (
        <AuthContext.Provider value={{ token, savetoken, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
