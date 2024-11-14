import { StyleSheet, Text, View, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
// import AutoHeightImage from "react-native-auto-height-image";
import "react-native-gesture-handler";
export default function SelectType({ navigation}) {
    const sweetHouse = require("../assets/sweetHouse.png");
    return (
        <View style={styles.container}>
            <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
                <View style={ styles.vertical}>
                    <View style={styles.horizon}>
                        <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate("UploadImg")} >
                            <Text style={styles.num}>01</Text>
                            <Image source={require('../assets/icons/free-icon-christmas-sweater-2300218.png')}
                                style={styles.img}
                            />
                            <Text style={styles.title}>스웨터</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate("UploadImg")}>
                            <Text style={styles.num}>02</Text>                           
                            <Image source={require('../assets/icon.png')}
                                style={styles.img}
                            />
                            <Text style={styles.title}>목도리</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizon}>
                        <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate("UploadImg")} >
                            <Text style={styles.num}>03</Text>
                            <Image source={require('../assets/icon.png')}
                                style={styles.img}
                            />
                            <Text style={styles.title}>목도리</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate("UploadImg")}>
                            <Text style={styles.num}>04</Text>
                            <Image source={require('../assets/icon.png')}
                                style={styles.img}
                            />
                            <Text style={styles.title}>목도리</Text>
                        </TouchableOpacity>
                    </View>
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
    img: {
        width: "70%",
        height: '50%',
        marginTop:15,
    },
    eachItem: {
        width: '40%',
        height:'100%',
        borderRadius: 10,
        border: '#FFFFFF 2px solid',
        backgroundColor: 'rgba(255,255,255,0.6)',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 6,
        marginRight:6,
    },
    horizon: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: '45%',
        marginTop: 5,
        marginBottom:5,
    },
    vertical: {
        width: '100vw',
        marginTop:'40vh',
        height:'55vh',
        marginBottom:'5vh',
    },
    num: {
        fontSize: 13,
        fontWeight: 600,
        marginTop: '10%',
        color: '#6785A0',
    },
    title: {
        fontSize: 15,
        fontWeight: 600,
        marginTop: 5,
        marginBottom: 5,
        color: '#476073',
    },
});
