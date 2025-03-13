import { Text, Linking, StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import BigCustomBtn from '../components/BigCustomBtn';
import { Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Community() {
    const contents = ""//글 내용
    const nickname = ""//작성자 닉네임
    const reply = [
        ["댓글 닉네임","댓글 내용"],
        ["댓글 닉네임", "댓글 내용"],
    ]
  return (
      <View> 
        {nickname}  
        {contents}
      </View>
  );
}
