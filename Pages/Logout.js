import { useEffect } from 'react';
import { Text, StyleSheet, View, ImageBackground, Dimensions, Alert } from 'react-native';
import BigCustomBtn from '../components/BigCustomBtn';
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { EXPO_PUBLIC_IPHOST } from "@env";
import * as SecureStore from "expo-secure-store";
// import * as WebBrowser from "expo-web-browser";
import { useAuth } from "../AuthContext";
// import InAppBrowser from 'react-native-inappbrowser-reborn';
// import { Linking } from 'react-native';
import { useState,useRef } from 'react';
import { WebView } from 'react-native-webview';
import * as Linking from 'expo-linking';
import {ActivityIndicator} from 'react-native';


const { width: SCREEN_WIDTH } = Dimensions.get("window");
const sweetHouse = require("../assets/background/login_1.png");
const BACKEND_LOGIN_URL = `http://${EXPO_PUBLIC_IPHOST}:8080/auth/login`;
const BACKEND_LOGOUT_URL = `http://${EXPO_PUBLIC_IPHOST}:8080/auth/logout`;

export default function Logout({ navigation }) {
    const { savetoken, loadToken, deleteToken, isLoading ,token,nickname,userId} = useAuth();
    const [loginUrl, setLoginUrl] = useState("");
    const webViewRef = useRef(null);
    useEffect(() => {
        const handleDeepLink = ({ url }) => {
        const { hostname, queryParams } = Linking.parse(url);
        console.log("url: ",url);
        if (hostname === 'login' && queryParams?.token && queryParams?.id&& queryParams?.nickname) {
            const newtoken = queryParams.token;
            const newuserId = queryParams.id;
            const newnickname = queryParams.nickname;

            savetoken(newtoken,newnickname,newuserId);
            loadToken();
            // Alert.alert("로그인이 완료되었습니다");

            // 로그인 성공 후 앱의 홈 등으로 이동
            navigation.reset({
            index: 0,
            routes: [{ name: 'NewPattern' }],
            });
        }
        };

        const subscription = Linking.addEventListener('url', handleDeepLink);

        // 앱이 백그라운드에서 열렸을 때도 확인
        (async () => {
        const initialUrl = await Linking.getInitialURL();
        console.log("초기 URL:", initialUrl);
        if (initialUrl) handleDeepLink({ url: initialUrl });
        })();

        return () => {
        subscription.remove();
        };
    }, []);

    const openKakaoLogin = async () => {
        console.log("버튼 확인");
        const exist_sisttoken = await SecureStore.getItemAsync('userToken');
        const exist_userId = await SecureStore.getItemAsync('userId');
        const exist_userNickname = await SecureStore.getItemAsync('userNickname');
        if(exist_sisttoken||exist_userId||exist_userNickname){
            console.log("token: ",token);
            console.log("userId: ",userId);
            console.log("userNickname: ",nickname);
            SecureStore.deleteItemAsync('userToken');
            SecureStore.deleteItemAsync('userId');
            SecureStore.deleteItemAsync('userNickname');    
            logout();
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'Home' }],
            // });
            return;
        }
        try{
            console.log("BACKEND_LOGIN_URL: ",BACKEND_LOGIN_URL);
            const response = await fetch(BACKEND_LOGIN_URL,{
                method: "GET",
                credentials: "omit", // 쿠키 안 보냄!
            });
            console.log("response: ",response);
            setLoginUrl(response.url);
            console.log("카카오 로그인 URL:", loginUrl);

        } catch (error) {
            console.error("카카오 로그인 오류:", error);
        }
        
        
    };
    const kakaoLogout = async () => {
        const response = await fetch(BACKEND_LOGOUT_URL);
        console.log("response: ",response);
        deleteToken();
        loadToken();
        console.log("로그아웃 완료");
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });        
    };
    // if (shouldReload) return null;

    return (
        <View style={styles.container}>
            {!token&&loginUrl.length>1?
                // console.log("카카오 로그인 URL:", {loginUrl})
                <View style={{ flex: 1 }}>
                    
                <WebView 
                    source={{uri:loginUrl}} 
                    startInLoadingState
                    renderLoading={() => <ActivityIndicator size="large"/>}
                    ref={webViewRef}
                    cacheEnabled={false}
                />
                </View>
            :
                <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
                    <View style={{ flex: 12 }} />
                    <View style={styles.btnContainer}>
                        <BigCustomBtn title="로그아웃" onPress={kakaoLogout} />
                    </View>
                </ImageBackground>
            
            }
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
