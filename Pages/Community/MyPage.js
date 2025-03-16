import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const baseUrl = 'http://localhost:8080/posts';

export default function MyPage({ navigation}) {
    const [myposts, setMyPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const nickname = '서자영';

    // 내가 쓴 게시물 조회
    const fetchmyPosts = async () => {
        try {
            const response = await fetch(`${baseUrl}/user?nickname=${nickname}`);
            const data = await response.json();
            setMyPosts(data);
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
        fetchmyPosts();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>내가 쓴 게시물</Text>

            {/* 게시글 목록 */}
            <FlatList
                data={myposts}
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

