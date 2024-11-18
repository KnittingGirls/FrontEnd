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

  // 업로드 함수
  const uploadImage = async () => {
    if (!selectedImage) {
      alert("이미지를 선택하세요");
      return;
    }

    const formData = new FormData();
    formData.append("image", {
      uri: selectedImage,
      name: "upload.jpg", // 서버에 전달될 파일 이름
      type: "image/jpeg", // 이미지 타입
    });

    try {
      console.log("이미지 업로드 요청 시작");

      const response = await fetch("http://localhost:8080/api/images/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      console.log("응답 상태:", response.status); // 응답 상태 코드 로그
      console.log("응답 텍스트:", await response.text());

      if (!response.ok) {
        console.error("서버 오류:", response.status, response.statusText);
        alert("서버 오류: 이미지 업로드 실패");
        return;
      }

      const result = await response.text();
      alert(result); // 서버로부터의 응답 표시
    } catch (error) {
      console.error("요청 오류:", error);
      alert("이미지 업로드 실패");
    }
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