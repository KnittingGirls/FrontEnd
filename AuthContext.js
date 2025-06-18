// context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [nickname, setNickname] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // 🔁 토큰과 닉네임 불러오기 (앱 처음 시작 시)
    const loadToken = async () => {
        try {
            const storedToken = await SecureStore.getItemAsync("token");
            const storedNickname = await SecureStore.getItemAsync("nickname");
            const storedUserId = await SecureStore.getItemAsync("userId");
            console.log("🟢 SecureStore에서 불러온 토큰:", storedToken);
            console.log("🟢 SecureStore에서 불러온 닉네임:", storedNickname);
            console.log("🟢 SecureStore에서 불러온 유저 아이디:", storedUserId);
            if (storedToken) {
                setToken(storedToken);
                setNickname(storedNickname);
                setUserId(storedUserId);
            }
        } catch (e) {
            console.error("토큰 로딩 에러:", e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadToken();
    }, []);

    // 로그인 후 토큰 저장
    const savetoken = async (newtoken, newnickname, newuserId) => {
        await SecureStore.setItemAsync("token", newtoken);
        await SecureStore.setItemAsync("nickname", newnickname);
        await SecureStore.setItemAsync("userId", newuserId);
        setToken(newtoken);
        setNickname(newnickname);
        setUserId(newuserId);
    };

    // 로그아웃 처리
    const deleteToken = async () => {
        await SecureStore.deleteItemAsync("token");
        await SecureStore.deleteItemAsync("nickname");
        await SecureStore.deleteItemAsync("userId");
        setToken(null);
        setNickname(null);
        setUserId(null);
        console.log("🟢 로그아웃 완료");
    };

    return (
        <AuthContext.Provider value={{ token, nickname, userId, savetoken, deleteToken, loadToken, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
