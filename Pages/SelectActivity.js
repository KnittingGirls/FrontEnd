import { StyleSheet, Text, View, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
// import AutoHeightImage from "react-native-auto-height-image";
import "react-native-gesture-handler";
export default function SelectActivity({ navigation }) {
    const background = require("../assets/background/path_simple.png");
    return (
        <View style={styles.container}>
            <ImageBackground source={background} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 2}}></View>
                <View style={styles.vertical}>
                    <View style={styles.horizon}>
                        <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate("SelectType")} >
                            <Text style={styles.num}>01</Text>
                            <Image source={require('../assets/SelectActivity/free-icon-knitting-2780135.png')}
                                style={styles.img}
                            />
                            <Text style={styles.title}>도안 생성</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate("AllPosts")}>
                            <Text style={styles.num}>02</Text>
                            <Image source={require('../assets/SelectActivity/free-icon-two-people-9426855.png')}
                                style={styles.img}
                            />
                            <Text style={styles.title}>커뮤니티</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizon}>
                        <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate("UploadImg")} >
                            <Text style={styles.num}>03</Text>
                            <Image source={require('../assets/SelectActivity/free-icon-woman-4829575.png')}
                                style={styles.img}
                            />
                            <Text style={styles.title}>마이 페이지</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.eachItem} onPress={() => navigation.navigate("UploadImg")}>
                            <Text style={styles.num}>04</Text>
                            <Image source={require('../assets/SelectActivity/free-icon-question-mark-9797431.png')}
                                style={styles.img}
                            />
                            <Text style={styles.title}>문의하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 2}}></View>
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
        marginTop: 15,
        justifyContent: 'center',
    },
    eachItem: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderStyle: 'solid',
        backgroundColor: 'rgba(255,255,255,0.6)',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 7,
        marginRight: 7,
        height: '95%',
        flex: 1,
        fontFamily:'MaplestoryLight',
    },
    horizon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'center'
    },
    vertical: {
        marginLeft: '4%',
        marginRight: '4%',
        width: '92%',
        flex: 6,
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
