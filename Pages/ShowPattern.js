import { StyleSheet, Text, View, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import "react-native-gesture-handler";
import CustomButton from '../components/CustomButton';

export default function ShowPattern({ navigation }) {
    const sweetHouse = require("../assets/sweetHouse.png");

    return (
        <View>
            <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
                <View style={styles.upload}>
                    
                </View>
                <View style={styles.btnContainer}>
                    <CustomButton title="저장하기" onPress={() => navigation.navigate("Home")} />
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    upload: {
        width: '85%',
        marginTop: '70%',
        height: '85vw',
        borderRadius: 10,
        border: '#FFFFFF 2px solid',
        backgroundColor: 'rgba(255,255,255,0.6)',
        marginLeft: 6,
        marginRight: 6,
    },
    btnContainer: {
        marginLeft: '48vw',
        marginTop: '3%',
        alignItems: 'right',
    },
});
