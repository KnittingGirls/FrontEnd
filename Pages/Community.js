import { Text, Linking, StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import BigCustomBtn from '../components/BigCustomBtn';
import { Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Community() {
    //이거 파일 올렸어 이대로 채워주면 될 듯 아마?? 더 필요한 거 있음 contents 만들면 됨 
    
    const contents = "contents"//글 내용
    const nickname = "nickname"//작성자 닉네임
    const reply = [
        ["댓글 닉네임","댓글 내용"],
        ["댓글 닉네임", "댓글 내용"],
    ]
  return (
      <View> 
          <Text>
                {nickname}<br />
                {contents}<br/>
                {reply[0][0]}: {reply[0][1]}<br/>
                {reply[1][0]}: {reply[1][1]}
          </Text> 
          
      </View>
  );
}
