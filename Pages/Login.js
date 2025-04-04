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
const REDIRECT_SCHEME = "myapp://home"; // 앱으로 돌아올 URI
const BACKEND_LOGIN_URL = `http://${EXPO_PUBLIC_IPHOST}:8080/auth/login`;


export default function Login({ navigation }) {
    const sweetHouse = require("../assets/background/login_1.png");
    useEffect(() => {
        const handleRedirect = async (event) => {
            const url = event.url;
            const tokenParam = Linking.parse(url).queryParams?.token;

            if (tokenParam) {
                await SecureStore.setItemAsync("token", tokenParam);
                navigation.replace("Home");
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
        await WebBrowser.openAuthSessionAsync(BACKEND_LOGIN_URL, REDIRECT_SCHEME);
        console.log("로그인 성공");
        navigation.replace("Drawer");//이렇게 하면 첫 페이지로 돌아감
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

