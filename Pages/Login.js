import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import CustomButton from '../components/CustomButton';
// import "react-native-gesture-handler";

export default function Login({ navigation }) {
    const sweetHouse = require("../assets/background/login.png");

    return (
        <View style={styles.container}>
            <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 9 }}></View>
                <View style={styles.btnContainer}>
                    <CustomButton title="로그인" onPress={() => navigation.navigate("SelectActivity")} />
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
        marginLeft: '20%',
    }
});
