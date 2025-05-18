import { StyleSheet, Text, View, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import "react-native-gesture-handler";
import CustomButton from '../components/CustomButton';

export default function ShowPattern({ navigation }) {
    const sweetHouse = require("../assets/background/sweetHouse_1.png");

    return (
        <View style={styles.container}>
            <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 1 }}></View>
                {/* <View style={styles.show}> */}
                    <Image source={require('../assets/ShowPattern/example.jpg')}
                        style={styles.show}
                    />
                {/* </View> */}
                <View style={styles.btnContainer}>
                    <CustomButton title="저장하기" onPress={() => alert("저장이 완료되었습니다!")} />
                    <CustomButton title="완료" onPress={() => navigation.replace("Drawer")} />
                </View>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: SCREEN_WIDTH,
        height: "100%",
        // justifyContent: 'center',
        alignItems: 'center',
    },
    show: {
        width: '85%',
        marginTop: '70%',
        flex:8,
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
        flex:2,
        marginLeft: '33%',
        marginTop: '3%',
        alignItems: 'right',
        flexDirection:'row'
    },
});
