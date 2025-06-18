import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import BigCustomBtn from '../components/BigCustomBtn';
import { useAuth } from '../AuthContext';

export default function Home({ navigation }) {
    const sweetHouse = require("../assets/background/start_1.png");
    const { token, nickname, isLoading } = useAuth();
    return (
        <View style={styles.container}>
            {<ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image} resizeMethod='auto'>
                <View style={{flex:12}}></View>
                <View style={styles.btnContainer}>
                    <BigCustomBtn title="시작하기" onPress={() => token?navigation.navigate("Logout"):navigation.navigate("Login")} />
                </View>
            </ImageBackground>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: SCREEN_WIDTH,
        height: "100%",
    },
    image: {
        width: SCREEN_WIDTH,
        height: '100%',
        // justifyContent: 'center',
        flexDirection:'column'
    },
    btnContainer: {
        flex:1,
        marginLeft:'17%',
    }
});
