import React, { useState } from "react";
import {StyleSheet,Text,View,ImageBackground,Dimensions,TouchableOpacity,Image, Alert,} from "react-native";
import CustomButton from "../components/CustomButton";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
// import RNFS from 'react-native-fs';
import * as MediaLibrary from 'expo-media-library';

// import { RNCamera } from 'react-native-camera';
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
import { EXPO_PUBLIC_IPHOST,EXPO_POST_BASE_URL } from "@env";

export default function UploadImg({ navigation }) {
    const sweetHouse = require("../assets/background/sweetHouse_1.png");
    const [selectedImage, setSelectedImage] = useState(null);
    const [pdfPath, setPdfPath] = useState('');
    const [showLoading, setShowLoading] = useState(false);
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
            Alert.alert("이미지를 선택하세요");
            return;
        }
        const formData = new FormData();
        formData.append("file", {
            uri: selectedImage.uri,
            type: selectedImage.mimeType, // 또는 적절한 MIME 타입 (예: image/png)
            name: selectedImage.fileName, // 백엔드에서 요구하는 파일 이름
        });

        try {
            setShowLoading(true); // 로딩 상태 표시
            //서버 IP 주소로 아래 주소 변경 필요 
            const response = await fetch(`http://${EXPO_PUBLIC_IPHOST}:8080/model-server/predict`, {
                method: "POST",
                body: formData,
            });

            console.log("응답 상태:", response.status);
            const result = await response.json();
            if (!response.ok) {
                console.error("서버 오류:", response.status, response.statusText);
                // Alert.alert("서버 오류: 이미지 업로드 실패");
                return;
            }
            setShowLoading(false);
            console.log(result.pdf_filename);
            setPdfPath(result.pdf_filename);
            console.log("pdfPath:"+pdfPath);
            // console.log(result.mask_path);

        } catch (error) {
            console.error("요청 오류:", error);
            alert("이미지 업로드 실패");
        }
    };
    const downloadPDF = async () => {
        try {
          const fileUrl = `http://${EXPO_PUBLIC_IPHOST}:8000/pdfs/${pdfPath}`;
          const fileName = pdfPath;

          const permission = await MediaLibrary.requestPermissionsAsync();
          if (!permission.granted) {
            alert('저장 권한이 필요합니다.');
            return;
          }
          const downloadPath = FileSystem.documentDirectory + fileName;
          const downloadResumable = FileSystem.createDownloadResumable(
            fileUrl, // 다운로드할 파일 URL
            downloadPath, // 로컬에 저장할 경로
            {}, // 헤더 등 옵션
            (downloadProgress) => {
                const progress =
                  downloadProgress.totalBytesWritten /
                  downloadProgress.totalBytesExpectedToWrite;
                console.log(`📥 다운로드 진행률: ${Math.round(progress * 100)}%`);
              }
          );
          const { uri } = await downloadResumable.downloadAsync();
          console.log("📥 다운로드 위치:", uri);
      
        //   const info = await FileSystem.getInfoAsync(uri);
        //   console.log("📏 파일 크기:", info.size);
        //   if (info.size === 0) {
        //     Alert.alert("파일 크기가 0입니다.");
        //     return;
        //   }
      
        //   const asset = await MediaLibrary.createAssetAsync(uri);
        //   Alert.alert("📦 저장 성공:", asset);
      
        //   try {
        //     await MediaLibrary.createAlbumAsync("Download", asset, false);
        //     Alert.alert("📁 앨범에 추가 성공");
        //   } catch (e) {
        //     console.warn("앨범 추가 실패 (무시 가능):", e);
        //   }
      
        //   Alert.alert("다운로드 완료!", "다운로드 폴더에서 확인하세요.");
      
          if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(uri);
          } else {
            Alert.alert("공유 불가", "이 디바이스는 공유 기능을 지원하지 않습니다.");
          }
      
        } catch (e) {
          console.error("❌ 전체 오류:", e);
          Alert.alert("오류", "파일 다운로드 또는 저장 중 문제가 발생했습니다.");
        }
    };
    
    return (
        <View style={ styles.container}>
            <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
                <View style={{ flex: 1 }}></View>
                {pdfPath ?
                    <View style={styles.upload}>
                        {selectedImage && (
                            <Image source={require("./../assets/postImages/grid1.jpg") } style={styles.img} />
                        )}
                        {/* <TouchableOpacity onPress={downloadPDF} style={styles.pickButton}>
                            <Text>pdf 다운로드</Text>
                        </TouchableOpacity> */}
                    </View>
                    :showLoading?
                    <View style={styles.upload}>
                        <Text style={{fontSize:20, fontWeight:"bold"}}>도안 생성 중...</Text>
                    </View>
                    :<View style={styles.upload}>
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
                    :showLoading?
                        <View style={styles.btnContainer}>
                        </View>
                        :<View style={styles.btnContainer}>
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