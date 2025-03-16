import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons';
import EachPost from './EachPost';
const baseUrl = 'http://localhost:8080/posts';

export default function AllPosts({ navigation}) {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState("");
    const [newHashtags, setNewHashtags] = useState("");
    const [searchTag, setSearchTag] = useState("");
    const [searchNickname, setSearchNickname] = useState("");
    const [editingPost, setEditingPost] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [editHashtags, setEditHashtags] = useState("");

    const nickname = '서자영';

    // 전체 게시글 조회
    const fetchPosts = async () => {
        try {
            const response = await fetch(`${baseUrl}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('게시글 조회 에러:', error);
        }
    };

    // 해시태그 검색
    const searchByHashtag = async () => {
        try {
            const response = await fetch(`${baseUrl}/search?tag=${encodeURIComponent(searchTag)}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('해시태그 검색 에러:', error);
        }
    };

    // 작성자로 검색
    const searchByUser = async () => {
        try {
            const response = await fetch(`${baseUrl}/user?nickname=${searchNickname}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('작성자 검색 에러:', error);
        }
    };

    // 북마크 목록 조회
    const fetchBookmarks = async () => {
        try {
            const response = await fetch(`${baseUrl}/bookmarks?nickname=${nickname}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('북마크 조회 에러:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>커뮤니티</Text>
            <TouchableOpacity onPress={() => { navigation.navigate("NewPost") }}><Text>작성하기</Text></TouchableOpacity>
            {/* 해시태그 검색 */}
            <TextInput
                style={styles.input}
                placeholder="검색할 해시태그"
                value={searchTag}
                onChangeText={setSearchTag}
            />
            <TouchableOpacity style={styles.button} onPress={searchByHashtag}>
                <Text style={styles.buttonText}>해시태그 검색</Text>
            </TouchableOpacity>

            {/* 게시글 목록 */}
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.postContainer} onPress={() => { navigation.navigate("EachPost", {postId:item.id}) }}>
                        <Text style={styles.postContent}>{item.content}</Text>
                        <Text style={styles.hashtags}>{item.hashtags?.join(' ')}</Text>
                    </TouchableOpacity>
                )}
            />

            {/* 북마크 목록 */}
            <TouchableOpacity style={styles.button} onPress={fetchBookmarks}>
                <Text style={styles.buttonText}>북마크 목록 보기</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    input: { borderWidth: 1, padding: 10, marginVertical: 5 },
    button: { backgroundColor: 'blue', padding: 10, marginVertical: 5, alignItems: 'center' },
    buttonText: { color: 'white', fontWeight: 'bold' },
    postContainer: { borderWidth: 1, padding: 10, marginVertical: 5 },
    postContent: { fontSize: 18 },
    hashtags: { color: 'gray' }
});

