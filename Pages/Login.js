import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import BigCustomBtn from '../components/BigCustomBtn';


export default function Login({ navigation }) {
    const sweetHouse = require("../assets/background/login_1.png");

    useEffect(() => {
        Linking.addEventListener(URL, handleAuthCallback);

        return () => {
            Linking.removeAllListeners(URL, handleAuthCallback);
        };
    }, [navigation]);

    const handleKakaoLogin = () => {
        // 백엔드 카카오 로그인 요청
        const kakaoLoginUrl = 'http://10.210.35.68:8080/auth/login';

        // 카카오 로그인 페이지로 리디렉션
        // try(){

        // }
        Linking.openURL(kakaoLoginUrl)
            .catch(err => console.error("Failed to open URL", err));
    };

    const handleAuthCallback = (event) => {
        const { url } = event;

        // URL에서 token 추출
        const token = new URL(url).searchParams.get('token');

        if (token) {
            // JWT 토큰 저장 및 관리 -> 이후 SelectActivity로 이동
            navigation.navigate('SelectActivity');
        }

    };

    return (
        <View style={styles.container}>
            <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 12 }}></View>
                <View style={styles.btnContainer}>
                    {/* 로그인 버튼 클릭 시 카카오 로그인 페이지로 이동 */}
                    {/* <CustomButton title="카카오 로그인" onPress={handleKakaoLogin} /> */}
                    <BigCustomBtn title="카카오 로그인" onPress={() => { navigation.navigate('SelectActivity') }} />
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
        // justifyContent: 'center',
        flexDirection: 'column'
    },
    btnContainer: {
        flex: 1,
        marginLeft: '17%',
    }
});
