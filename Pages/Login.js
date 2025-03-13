import { useEffect } from 'react';
import { Text, Linking, StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import BigCustomBtn from '../components/BigCustomBtn';
import { Button, Alert } from "react-native";
import { login, getProfile } from "@react-native-seoul/kakao-login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";


export default function Login({ navigation }) {
    const sweetHouse = require("../assets/background/login_1.png");

    const navigation2 = useNavigation();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            navigation2.replace("Home"); // 로그인 되어 있으면 홈 화면으로 이동
        }
    };

    const handleKakaoLogin = async () => {
        try {
            const result = await login(); // 카카오 로그인 실행
            console.log("로그인 성공", result);

            // 사용자 정보 가져오기
            const profile = await getProfile();
            console.log("사용자 정보:", profile);

            // 백엔드에 카카오 토큰 전달
            const response = await fetch('http://10.210.35.68:8080/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accessToken: result.accessToken }),
            });

            const data = await response.json();
            if (data.success) {
                await AsyncStorage.setItem("token", data.token); // 로그인 성공 시 토큰 저장
                navigation2.replace("Home");
            } else {
                Alert.alert("로그인 실패", data.message);
            }
        } catch (error) {
            console.error(error);
            Alert.alert("로그인 오류", "카카오 로그인 중 문제가 발생했습니다.");
        }
    };


    return (
        <View style={styles.container}>
            <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 12 }}></View>
                <View style={styles.btnContainer}>
                    {/* 로그인 버튼 클릭 시 카카오 로그인 페이지로 이동 */}
                    {/* <BigCustomBtn title="카카오 로그인" onPress={handleKakaoLogin} /> */}
                    <BigCustomBtn title="카카오 로그인" onPress={() => { navigation.navigate('SelectType') }} />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    image: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        flexDirection: 'column'
    },
    btnContainer: {
        flex: 1,
        marginLeft: '17%',
    }
});

