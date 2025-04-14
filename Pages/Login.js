import { useEffect } from 'react';
import { Text, StyleSheet, View, ImageBackground, Dimensions,Alert } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";

import BigCustomBtn from '../components/BigCustomBtn';
import { Button } from "react-native";
// import { login, getProfile } from "@react-native-seoul/kakao-login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { EXPO_PUBLIC_IPHOST } from "@env";
import React from "react";
import { useAuth } from "../AuthContext";

const REDIRECT_SCHEME = "myapp://Home"; // 앱으로 돌아올 URI
const BACKEND_LOGIN_URL = `http://10.240.185.27:8080/auth/login`;


export default function Login({ navigation }) {
    const sweetHouse = require("../assets/background/login_1.png");
    const { savetoken } = useAuth();
    useEffect(() => {
        const handleRedirect = async (event) => {
            const url = event.url;
            const tokenParam = Linking.parse(url).queryParams?.token;
            // const nicknameParam = Linking.parse(url).queryParams?.nickname;
            if (tokenParam) {
                await SecureStore.setItemAsync("token", tokenParam);
            } else {
                // Alert.alert("로그인 실패", "토큰이 전달되지 않았습니다.");
                console.log("로그인 실패", "토큰이 전달되지 않았습니다.");
            }
        };

        const subscription = Linking.addEventListener("url", handleRedirect);

        Linking.getInitialURL().then((url) => {
            if (url) handleRedirect({ url });
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const openKakaoLogin = async () => {
        const result = await WebBrowser.openAuthSessionAsync(BACKEND_LOGIN_URL, REDIRECT_SCHEME);
        if (result.type === "success") {result.url.remove()}
        console.log("로그인 성공");
        const token =  SecureStore.getItemAsync("token");
        console.log(token);
        savetoken(token); //await를 안쓰니까 일단 넘어가긴 하는데 이게 그냥 넘어간건지 돼서 넘어간건지 모르겠다..
        console.log("저장 완료");//여기까지 못가는 이유가 뭘까..?
    };
    
    return (
        <View style={styles.container}>
            <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 12 }}></View>
                <View style={styles.btnContainer}>
                    {/* 로그인 버튼 클릭 시 카카오 로그인 페이지로 이동 */}
                    <BigCustomBtn title="카카오 로그인" onPress={openKakaoLogin} />
                    {/* <BigCustomBtn title="카카오 로그인" onPress={() => { navigation.navigate('SelectType') }} /> */}
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: "100%",
    },
    image: {
        width: SCREEN_WIDTH,
        height: "100%",
        flexDirection: 'column'
    },
    btnContainer: {
        flex: 1,
        marginLeft: '17%',
    }
});

