import { StyleSheet, Text, View, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import "react-native-gesture-handler";
import CustomButton from '../components/CustomButton';

export default function AdditionalInfo({ navigation }) {
    const sweetHouse = require("../assets/background/sweetHouse.png");

    return (
        <View>
            <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
                <View style={styles.Info}>
                    <Text>
                        {/* 실  */}
                    </Text>
                </View>
                <View style={styles.btnContainer}>
                    <CustomButton title="입력 완료" onPress={() => navigation.navigate("ShowPattern")} />
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
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    Info: {
        width: '85%',
        marginTop: '70%',
        flex: 8,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderStyle: 'solid',
        backgroundColor: 'rgba(255,255,255,0.6)',
        marginLeft: 6,
        marginRight: 6,
        marginBottom: '5%',
    },
    btnContainer: {
        flex: 2,
        marginLeft: '48%',
        marginTop: '3%',
        alignItems: 'right',
    },
});
