import { StyleSheet, Text, View, ImageBackground, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

import "react-native-gesture-handler";
import CustomButton from '../components/CustomButton';

export default function AdditionalInfo({ navigation }) {
    const sweetHouse = require("../assets/sweetHouse.png");

    return (
        <View style={styles.container}>
            <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
                <View>
                    <CustomButton title="도안 확인하기" onPress={() => navigation.navigate("ShowPattern")} />
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
        justifyContent: 'center',
    },
});
