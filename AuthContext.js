// context/AuthContext.js
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const loadToken = async () => {
        const savedToken = await SecureStore.getItemAsync("token");
        if (savedToken) {
            setToken(savedToken);
        }
        setIsLoading(false);
    };

    const saveToken = async (jwt) => {
        await SecureStore.setItemAsync("token", jwt);
        setToken(jwt);
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync("token");
        setToken(null);
    };

    useEffect(() => {
        loadToken();
    }, []);

    return (
        <AuthContext.Provider value={{ token, saveToken, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
