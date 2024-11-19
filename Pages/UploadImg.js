import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function UploadImg({ navigation }) {
  const sweetHouse = require("../assets/background/sweetHouse.png");
  const [selectedImage, setSelectedImage] = useState(null);

  // 이미지 선택 함수
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setSelectedImage(result.assets[0].uri); // 선택한 이미지의 URI 저장
      console.log("선택한 이미지 URI:", result.assets[0].uri); // 선택한 이미지 URI 로그
    } else {
      console.log("이미지를 선택하지 않았습니다.");
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      alert("이미지를 선택하세요");
      return;
    }

    const formData = new FormData();

    // selectedImage는 파일 경로입니다.
    const imageUri = selectedImage; // 선택된 이미지 URI
    const fileName = imageUri.split('/').pop(); // 파일 이름 추출

    // 파일 MIME 타입을 자동으로 추론하거나, 기본값을 설정
    const mimeType = getMimeType(imageUri);  // getMimeType 함수 사용

    // 이미지 파일을 FormData에 추가
    formData.append('image', {
      uri: imageUri,
      type: mimeType,   // 이미지 MIME 타입
      name: fileName,   // 파일 이름
    });

    try {
      const response = await fetch('http://10.240.94.239:8080/api/images/upload', {
        method: 'POST',
        body: formData, // FormData로 이미지 전송
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('이미지 업로드 성공', responseData);
    } catch (error) {
      console.error('업로드 실패', error);
    }
  };

const getMimeType = (uri) => {
  const extension = uri.split('.').pop().toLowerCase();  // 확장자 추출
  const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
  };
  return mimeTypes[extension] || "application/octet-stream";  // 기본 MIME 타입
};
  return (
    <View>
      <ImageBackground source={sweetHouse} resizeMode="cover" style={styles.image}>
        <View style={styles.upload}>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.img} />
          )}
          <TouchableOpacity onPress={pickImage} style={styles.pickButton}>
            <Text>이미지 선택</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={uploadImage} style={styles.uploadButton}>
            <Text>업로드</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
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
  uploadButton: {
    padding: 10,
    backgroundColor: "#28a745",
    borderRadius: 5,
  },
  btnContainer: {
    flex: 2,
    marginLeft: "48%",
    marginTop: "3%",
  },
  img: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});