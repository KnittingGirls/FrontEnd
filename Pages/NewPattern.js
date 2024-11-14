import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import CustomButton from '../components/CustomButton';
import "react-native-gesture-handler";

export default function NewPattern({ navigation }) {
    const stepImg = require("../assets/background/patternsteps.png");

    return (
        <View style={styles.container}>
            <ImageBackground source={stepImg} resizeMode="cover" style={styles.image}>
                <View style={styles.btnContainer}>
                    <CustomButton title="도안 생성" onPress={() => navigation.navigate("SelectType")} />                    
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    image: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
    },
    btnContainer: {
        marginLeft: '55vw',
        marginTop: '80vh',
        alignItems: 'right',
    },
});
