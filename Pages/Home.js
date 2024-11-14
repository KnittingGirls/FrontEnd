import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import CustomButton from '../components/CustomButton';
// import "react-native-gesture-handler";

export default function Home({ navigation }) {
    const sweetHouse = require("../assets/start.png");

    return (
        <View style={styles.container}>
            <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
                <View style={styles.btnContainer}>
                    <CustomButton title="시작하기" onPress={() => navigation.navigate("NewPattern")} />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    image: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
    },
    btnContainer: {
        // height:'20%',
        marginLeft:'20%',
        marginTop:'80vh',
        alignItems:'right',
    }
});
