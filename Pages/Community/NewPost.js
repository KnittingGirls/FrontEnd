import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput,StyleSheet ,Image} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useAuth } from "../../AuthContext";
import { EXPO_PUBLIC_IPHOST, EXPO_POST_BASE_URL } from "@env";

export default function NewPost({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState("");
    const [newHashtags, setNewHashtags] = useState("");
    const [selectedImage, setSelectedImage] = useState([]);
    const { token, nickname, userId, isLoading } = useAuth(); 
    
    // 이미지 선택 함수
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaType: ['photo'],
            allowsEditing: true,
            quality: 1,
        });
        // console.log(result);
        if (!result.canceled && result.assets[0].uri) {
            setSelectedImage([...selectedImage, result.assets[0]]);
            console.log(selectedImage);
        } else {
            console.log("이미지를 선택하지 않았습니다.");
        }
    };
    
    // 게시글 작성
    const createPost = async () => {
        // console.log("버튼 작동은 함");
        const hashtagsArray = newHashtags.split(',').map(tag => tag.trim());
        const formData = new FormData();
        formData.append('postDto', JSON.stringify({ content: newPostContent, hashtags: hashtagsArray }));
        selectedImage.forEach((image, index) => {
            formData.append('images', {
                uri: image.uri,
                type: image.mimeType,
                name: image.fileName 
            });
        });
        console.log(formData);
        try {
            await fetch(`http://${EXPO_PUBLIC_IPHOST}:8080/posts?nickname=${nickname}`, {
                method: 'POST',
                body: formData,
            });
            setNewPostContent("");
            setNewHashtags("");
            navigation.replace("AllPosts"); 
        } catch (error) {
            console.error('게시글 작성 에러:', error);
        }
    };

    return(<View style={styles.container}>
                <Text style={styles.header}>게시물 작성</Text>
                {/* 게시글 작성 */}
                <TextInput
                    style={{ ...styles.input,  minHeight: 180,maxHeight:200}}
                    placeholder="내용"
                    value={newPostContent}
                    onChangeText={setNewPostContent}
                    multiline={true}
                />
                <TextInput
                    style={{ ...styles.input, minHeight:60,maxHeight: 60 }}
                    placeholder="해시태그 (ex. #태그1, #태그2)"
                    value={newHashtags}
                    onChangeText={setNewHashtags}
                    multiline={true}
                />
                <View style={styles.imageUpload}>
                    {/* {selectedImage && (
                        <Image source={{ uri: selectedImage.uri }} style={styles.img} />
                    )} */}
                    {selectedImage && selectedImage.map((item, index) => (
                        <Image key={index} source={{ uri: item.uri }} style={styles.img} />
                    ))} 
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={pickImage} style={styles.button}>
                        <Text style={styles.buttonText}>이미지 업로드</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={createPost}>
                        <Text style={styles.buttonText}>게시글 작성</Text>
                    </TouchableOpacity>
                </View>
        </View>);
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20,backgroundColor:"white" },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    input: {
        borderWidth: 1,
        padding: 15,
        marginVertical: 5, flexShrink: 2, flex: 4,
        textAlignVertical: 'top'
    },
    button: { backgroundColor: "rgb(241, 160, 91)", padding: 10, marginVertical: 5, alignItems: 'center'},
    buttonText: { color: 'black', fontWeight: 'bold' },
    postContainer: { borderWidth: 1, padding: 10, marginVertical: 5 },
    postContent: { fontSize: 18 },
    hashtags: { color: 'gray' },
    imageUpload: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
     },
    img: {
        width: 120,
        height: 120,
        marginVertical: 10,
    },
    pickImage: {
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
        justifyContent:"flex-end"
    }
});

