import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
const baseUrl = 'http://localhost:8080/posts';

export default function EachPost({route}) {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [editHashtags, setEditHashtags] = useState("");
    const [replies, setReplies] = useState("");

    const nickname = '서자영';
    const postId = route.params.postId;

    const fetchPosts = async () => {
        try {
            const data = await fetch(`${baseUrl}/${postId}`); //이 주소가 맞는지 확인 필요함
            // const data = await response.json();
            // const replyres = await fetch(`${baseUrl}/${postId}/comment`); 
            // const replydata = await replyres.json();
            setPosts(data);
            // setReplies(replydata);
        } catch (error) {
            console.error('게시글 조회 에러:', error);
        }
    };
    // 게시글 수정
    const updatePost = async (postId) => {
        try {
            await fetch(`${baseUrl}/${postId}?nickname=${nickname}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: editContent,
                    hashtags: editHashtags.split(',').map(tag => tag.trim())
                })
            });
            setEditingPost(null);
            fetchPosts();
        } catch (error) {
            console.error('게시글 수정 에러:', error);
        }
    };

    // 게시글 삭제
    const deletePost = async (postId) => {
        try {
            await fetch(`${baseUrl}/${postId}?nickname=${nickname}`, {
                method: 'DELETE',
            });
            fetchPosts();
        } catch (error) {
            console.error('게시글 삭제 에러:', error);
        }
    };

    // 게시글 좋아요
    const likePost = async (postId) => {
        try {
            await fetch(`${baseUrl}/${postId}/like?nickname=${nickname}`, { method: 'POST' });
            fetchPosts();
        } catch (error) {
            console.error('좋아요 에러:', error);
        }
    };

    // 게시글 북마크
    const bookmarkPost = async (postId) => {
        try {
            await fetch(`${baseUrl}/${postId}/bookmark?nickname=${nickname}`, { method: 'POST' });
            fetchPosts();
        } catch (error) {
            console.error('북마크 에러:', error);
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

            {/* 게시글 목록 */}
            <View style={styles.postContainer}>
                {editingPost === posts.id ? (
                    <>
                        <TextInput
                            style={styles.input}
                            value={editContent}
                            onChangeText={setEditContent}
                            placeholder="새 내용"
                        />
                        <TextInput
                            style={styles.input}
                            value={editHashtags}
                            onChangeText={setEditHashtags}
                            placeholder="새 해시태그"
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => updatePost(postId)}
                        >
                            <Text style={styles.buttonText}>수정 완료</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => setEditingPost(null)}>
                            <Text style={styles.buttonText}>취소</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={styles.postContent}>{posts.content}</Text>
                        <Text style={styles.hashtags}>{posts.hashtags?.join(' ')}</Text>
                        <View style={styles.btnContainer}>
                            {/* 좋아요 */}
                            <TouchableOpacity style={styles.button} onPress={() => likePost(posts.id)}>
                                <AntDesign name={'like2'} size={25} color={"black"}/>
                            </TouchableOpacity>

                            {/* 북마크 */}
                            <TouchableOpacity style={styles.button} onPress={() => bookmarkPost(posts.id)}>
                                <FontAwesome6 name={'bookmark'} size={25} color={"black"} />    
                            </TouchableOpacity>

                            {/* 수정 */}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    setEditingPost(posts.id);
                                    setEditContent(posts.content);
                                    setEditHashtags(posts.hashtags.join(', '));
                                }}
                            >
                                <AntDesign name={'edit'} size={25} color={"black"} />    
                            </TouchableOpacity>

                            {/* 삭제 버튼 */}
                            <TouchableOpacity style={[styles.button]} onPress={() => deletePost(posts.id)}>
                                <AntDesign name={'delete'} size={25} color={"black"} />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
          
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    input: { borderWidth: 1, padding: 10, marginVertical: 5 },
    btnContainer:{flexDirection:"row"},
    button: { backgroundColor: 'transparent', padding: 10, marginVertical: 5, alignItems: 'center',flex:1 },
    buttonText: { color: 'white', fontWeight: 'bold' },
    postContainer: { borderWidth: 1, padding: 10, marginVertical: 5 },
    postContent: { fontSize: 18 },
    hashtags: { color: 'gray' }
});

