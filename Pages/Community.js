import { Text, Linking, StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import BigCustomBtn from '../components/BigCustomBtn';
import { Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Community() {
    // 게시글 내용
    const [contents, setContents] = useState("글 내용");
    // 작성자 닉네임
    const [nickname, setNickname] = useState("작성자 닉네임");
    // 댓글
    const [reply, setReply] = useState([
        ["댓글 닉네임1", "댓글 내용1"],
        ["댓글 닉네임2", "댓글 내용2"]
    ]);
    // 해시태그 목록
    const [hashtags, setHashtags] = useState(["#태그1", "#태그2"]);
    // 사용자로 검색
    const [userPosts, setUserPosts] = useState(["글1", "글2"]);
    // 해시태그로 검색
    const [searchResults, setSearchResults] = useState([["글1", "글2"]]);
    // 좋아요 (true: 좋아요O, false: 좋아요X)
    const [liked, setLiked] = useState(false);
    // 북마크 (true: 북마크O, false: 북마크X)
    const [bookmarked, setBookmarked] = useState(false);
    // 내 북마크 목록
    const [bookmarkedPosts, setBookmarkedPosts] = useState([["글1", "글2"]]);

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
