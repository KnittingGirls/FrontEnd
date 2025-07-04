import { StyleSheet, Text, View, ImageBackground, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
// import AutoHeightImage from "react-native-auto-height-image";
import "react-native-gesture-handler";
export default function SelectType({ navigation}) {
    const sweetHouse = require("../assets/background/sweetHouse.png");
    return (
        <View style={styles.container}>
            <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 4 }}></View>
                <View style={ styles.vertical}>
                    <View style={styles.horizon}>
                        <TouchableOpacity style={styles.eachItem} onPress={() => navigation.push("UploadImg")} >
                            <Text style={styles.num}>01</Text>
                            <Image source={require('../assets/SelectType/free-icon-christmas-sweater-2300218.png')}
                                style={styles.img}
                            />
                            <Text style={styles.title}>스웨터</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.notNowItem } onPress={() => Alert.alert("아직 지원하지 않는 서비스입니다")}>
                            <Text style={styles.notNowNum}>02</Text>                           
                            <Image source={require('../assets/SelectType/free-icon-scarf-13420578.png')}
                                style={styles.notNowImg}
                            />
                            <Text style={styles.notNowTitle}>목도리</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizon}>
                        <TouchableOpacity style={styles.notNowItem} onPress={() => Alert.alert("아직 지원하지 않는 서비스입니다")} >
                            <Text style={styles.notNowNum}>03</Text>
                            <Image source={require('../assets/SelectType/free-icon-winter-hat-616046.png')}
                                style={styles.notNowImg}
                            />
                            <Text style={styles.notNowTitle}>모자</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.notNowItem} onPress={() => Alert.alert("아직 지원하지 않는 서비스입니다")}>
                            <Text style={styles.notNowNum}>04</Text>
                            <Image source={require('../assets/SelectType/free-icon-knitting-2975720.png')}
                                style={styles.notNowImg}
                            />
                            <Text style={styles.notNowTitle}>기타</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1}}></View>
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
        flex: 1,
        width: SCREEN_WIDTH,
        height: "100%",
        justifyContent: 'center',
    },
    img: {
        height: '50%', width: "auto", maxwidth: "60%",
        minWidth: "50%",
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
        height:'95%',
        flex: 1,
        
    },
    notNowItem: {
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderStyle: 'solid',
        // fillColor: '#FFFFFF',
        backgroundColor: 'rgba(0,0,0,0.6)',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 7,
        marginRight: 7,
        height:'95%',
        flex: 1,
        color: '#FFFFFF',
    },
    horizon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex:1,
        marginTop: 5,
        marginBottom: 5,
        alignItems:'center'
    },
    vertical: {
        marginLeft: '4%',
        marginRight:'4%',
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
    notNowTitle: {
        fontSize: 15,
        fontWeight: 600,
        marginTop: 5,
        marginBottom: 5,
        color: '#999999',
    },
    notNowNum: {
        fontSize: 13,
        fontWeight: 600,
        marginTop: '10%',
        color: '#999999',
    },
    notNowImg:{
        height: '50%', width: "auto", maxwidth: "60%",
        minWidth: "50%",
        marginTop: 15,
        justifyContent: 'center',
        // overlayColor:"rgba(0,0,0,0.6)",
        tintColor:"rgba(0,0,0,0.7)",
    }
});
