import React, { useState } from "react";
import {StyleSheet,Text,View,ImageBackground,Dimensions,TouchableOpacity,Image,} from "react-native";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "../components/CustomButton";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import { EXPO_PUBLIC_IPHOST } from "@env";

export default function UploadImg({ navigation }) {
    const sweetHouse = require("../assets/background/sweetHouse_1.png");
    const [selectedImage, setSelectedImage] = useState(null);
    const [pdfPath, setPdfPath] = useState('');
    // 이미지 선택 함수
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('이미지를 선택하려면 권한이 필요합니다.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaType: ['photo'],
            allowsEditing: true,
            aspect:[1,1],
            quality: 1,
        });
        // console.log(result);
        if (!result.canceled && result.assets[0].uri) {
            setSelectedImage(result.assets[0]); // 선택한 이미지의 정보 저장
        } else {
            console.log("이미지를 선택하지 않았습니다.");
        }
    };
    // 업로드 함수 수정
    const uploadImage = async () => {
        if (!selectedImage || !selectedImage.uri) {
            alert("이미지를 선택하세요");
            return;
        }
        const formData = new FormData();
        formData.append("file", {
            uri: selectedImage.uri,
            type: selectedImage.mimeType, // 또는 적절한 MIME 타입 (예: image/png)
            name: selectedImage.fileName, // 백엔드에서 요구하는 파일 이름
        });

        try {
            console.log("이미지 업로드 요청 시작");

            //서버 IP 주소로 아래 주소 변경 필요 
            const response = await fetch(`http://192.168.45.18:8080/model-server/predict`, {
                method: "POST",
                body: formData,
            });

            console.log("응답 상태:", response.status);
            const result = await response.json();
            if (!response.ok) {
                console.error("서버 오류:", response.status, response.statusText);
                alert("서버 오류: 이미지 업로드 실패");
                return;
            }
            // alert("업로드 성공: " + result.message);
            console.log(result.pdf_filename);
            setPdfPath(result.pdf_filename);
            console.log(pdfPath);
            // console.log(result.mask_path);

        } catch (error) {
            console.error("요청 오류:", error);
            alert("이미지 업로드 실패");
        }
    };
   
    const downloadPDF = async () => {
        try {
            const fileUrl =`http://10.240.175.52:8000/pdfs/${pdfPath}`; // 예: http://192.168.0.5:8080/files/sample.pdf
            // const fileName = pdfPath;
            const fileUri = FileSystem.documentDirectory + pdfPath;

            // 파일 다운로드
            const { uri,status } = await FileSystem.downloadAsync(fileUrl, fileUri);
            console.log('✅ 파일 저장 위치:', uri);
            if (status != 200) { console.log("문제있다",status); }

            // alert('다운로드 완료', 'PDF 파일이 저장되었습니다.');

            // 파일 공유 또는 열기
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri);
            } else {
                alert('공유 불가', '이 디바이스에서는 공유 기능을 사용할 수 없습니다.');
            }
        } catch (error) {
            console.error('❌ 파일 다운로드 실패:', error);
            alert('오류', '파일 다운로드 중 오류가 발생했습니다.');
        }
    };
    
    return (
        <View style={ styles.container}>
            <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 1 }}></View>
                {pdfPath ?
                    <View style={styles.upload}>
                        {selectedImage && (
                            <Image source={{ uri: selectedImage.uri }} style={styles.img} />
                        )}
                        {/* <TouchableOpacity onPress={downloadPDF} style={styles.pickButton}>
                            <Text>pdf 다운로드</Text>
                        </TouchableOpacity> */}
                    </View>
                    :
                    <View style={styles.upload}>
                        {selectedImage && (
                            <Image source={{ uri: selectedImage.uri }} style={styles.img} />
                        )}
                        <TouchableOpacity onPress={pickImage} style={styles.pickButton}>
                            <Text>이미지 선택</Text>
                        </TouchableOpacity>
                    </View>
                }
                {pdfPath ?
                    <View style={styles.btnContainer2}>
                        <CustomButton title="저장/공유" onPress={downloadPDF} />
                        <CustomButton title="완료" onPress={() => navigation.replace("Drawer")} />
                    </View>
                    :
                    <View style={styles.btnContainer}>
                        <CustomButton title="업로드" onPress={uploadImage} />
                    </View>
                }
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: SCREEN_WIDTH,
        height: "100%",
    },
    image: {
        width: SCREEN_WIDTH,
        height: "100%",
        alignItems: "center",
    },
    upload: {
        width: "85%",
        marginTop: "70%",
        flex: 8,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FFFFFF",
        backgroundColor: "rgba(255,255,255,0.6)",
        marginLeft: 6,
        marginRight: 6,
        marginBottom: "5%",
        justifyContent: "center",
        alignItems: "center",
    },
    pickButton: {
        padding: 10,
        backgroundColor: "#ddd",
        borderRadius: 5,
        marginTop: 10,
    },
    btnContainer2: {
        flex: 2,
        marginLeft: '33%',
        marginTop: '3%',
        alignItems: 'right',
        flexDirection: 'row'
    },
    btnContainer: {
        flex: 2,
        marginLeft: "55%",
        marginTop: "3%",
    },
    img: {
        width: 200,
        height: 200,
        marginBottom: 10,
    },
});