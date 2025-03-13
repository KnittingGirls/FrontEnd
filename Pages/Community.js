import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

export default function Community() {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState("");
    const [newHashtags, setNewHashtags] = useState("");
    const [searchTag, setSearchTag] = useState("");
    const [searchNickname, setSearchNickname] = useState("");
    const nickname = '서자영';

    // 전체 게시글 조회
    const fetchPosts = async () => {
        try {
            const response = await fetch(`http://localhost:8080/posts`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('게시글 조회 에러:', error);
        }
    };

    // 게시글 작성
    const createPost = async () => {
        const hashtagsArray = newHashtags.split(',').map(tag => tag.trim());

        const formData = new FormData();
        formData.append('postDto', JSON.stringify({ content: newPostContent, hashtags: hashtagsArray }));

        try {
            await fetch(`http://localhost:8080/posts?nickname=${nickname}`, {
                method: 'POST',
                body: formData,
            });
            setNewPostContent("");
            setNewHashtags("");
            fetchPosts();
        } catch (error) {
            console.error('게시글 작성 에러:', error);
        }
    };

    // 게시글 수정
    const updatePost = async (postId) => {
        try {
            await fetch(`http://localhost:8080/posts/${postId}?nickname=${nickname}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: "수정된 내용", hashtags: ["#수정됨"] }),
            });
            fetchPosts();
        } catch (error) {
            console.error('게시글 수정 에러:', error);
        }
    };

    // 게시글 삭제
    const deletePost = async (postId) => {
        try {
            await fetch(`http://localhost:8080/posts/${postId}?nickname=${nickname}`, {
                method: 'DELETE',
            });
            fetchPosts();
        } catch (error) {
            console.error('게시글 삭제 에러:', error);
        }
    };

    // 해시태그 검색
    const searchByHashtag = async () => {
        try {
            const response = await fetch(`http://localhost:8080/posts/search?tag=${encodeURIComponent(searchTag)}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('해시태그 검색 에러:', error);
        }
    };

    // 작성자로 검색
    const searchByUser = async () => {
        try {
            const response = await fetch(`http://localhost:8080/posts/user?nickname=${searchNickname}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('작성자 검색 에러:', error);
        }
    };

    // 게시글 좋아요
    const likePost = async (postId) => {
        try {
            await fetch(`http://localhost:8080/posts/${postId}/like?nickname=${nickname}`, {
                method: 'POST',
            });
            fetchPosts();
        } catch (error) {
            console.error('좋아요 에러:', error);
        }
    };

    // 게시글 북마크
    const bookmarkPost = async (postId) => {
        try {
            await fetch(`http://localhost:8080/posts/${postId}/bookmark?nickname=${nickname}`, {
                method: 'POST',
            });
            fetchPosts();
        } catch (error) {
            console.error('북마크 에러:', error);
        }
    };

    // 북마크 목록 조회
    const fetchBookmarks = async () => {
        try {
            const response = await fetch(`http://localhost:8080/posts/bookmarks?nickname=${nickname}`);
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

            {/* 게시글 작성 */}
            <TextInput
                style={styles.input}
                placeholder="내용"
                value={newPostContent}
                onChangeText={setNewPostContent}
            />
            <TextInput
                style={styles.input}
                placeholder="해시태그 (쉼표로 구분 ex. #태그1, #태그2)"
                value={newHashtags}
                onChangeText={setNewHashtags}
            />
            <TouchableOpacity style={styles.button} onPress={createPost}>
                <Text style={styles.buttonText}>게시글 작성</Text>
            </TouchableOpacity>

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

            {/* 작성자로 검색 */}
            <TextInput
                style={styles.input}
                placeholder="검색할 작성자명"
                value={searchNickname}
                onChangeText={setSearchNickname}
            />
            <TouchableOpacity style={styles.button} onPress={searchByUser}>
                <Text style={styles.buttonText}>작성자 검색</Text>
            </TouchableOpacity>

            {/* 게시글 목록 */}
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        <Text style={styles.postContent}>{item.content}</Text>
                        <Text style={styles.hashtags}>{item.hashtags?.join(' ')}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => likePost(item.id)}>
                            <Text style={styles.buttonText}>좋아요</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => bookmarkPost(item.id)}>
                            <Text style={styles.buttonText}>북마크</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => deletePost(item.id)}>
                            <Text style={styles.buttonText}>삭제</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* 북마크 목록 조회 */}
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
