import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const baseUrl = 'http://localhost:8080/posts';

export default function Community() {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState("");
    const [newHashtags, setNewHashtags] = useState("");
    const [searchTag, setSearchTag] = useState("");
    const [searchNickname, setSearchNickname] = useState("");
    const [editingPost, setEditingPost] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [editHashtags, setEditHashtags] = useState("");
    const [commentText, setCommentText] = useState({});

    const nickname = '서자영';

    // 전체 게시글 조회
    const fetchPosts = async () => {
        try {
            const response = await fetch(`${baseUrl}`);
            if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('게시글 조회 에러:', error.message);
        }
    };

    // 북마크한 글 조회
    const fetchBookmarks = async () => {
        try {
            const response = await fetch(`${baseUrl}/bookmarks?nickname=${nickname}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('북마크 조회 에러:', error);
        }
    };

    // 댓글 작성
    const commentPost = async (postId) => {
        if (!commentText[postId]?.trim()) return;
        try {
            const nicknameEncoded = encodeURIComponent(nickname);
            const contentEncoded = encodeURIComponent(commentText[postId]);

            await fetch(`${baseUrl}/${postId}/comment?nickname=${nicknameEncoded}&content=${contentEncoded}`, {
                method: 'POST',
            });

            setCommentText(prev => ({ ...prev, [postId]: "" }));
            fetchPosts();
        } catch (error) {
            console.error('댓글 작성 에러:', error);
        }
    };

     // 게시글 작성
     const createPost = async () => {
         const hashtagsArray = newHashtags.split(',').map(tag => tag.trim());
         const formData = new FormData();
         formData.append('postDto', JSON.stringify({ content: newPostContent, hashtags: hashtagsArray }));

         try {
             await fetch(`${baseUrl}?nickname=${nickname}`, {
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
            await fetch(`${baseUrl}/${postId}?nickname=${nickname}`, { method: 'DELETE' });
            fetchPosts();
        } catch (error) {
            console.error('게시글 삭제 에러:', error);
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

    // 좋아요
    const toggleLike = async (postId) => {
        try {
            const response = await fetch(`${baseUrl}/${postId}/like?nickname=${nickname}`, { method: 'POST' });

            if (response.ok) {
                setPosts(prevPosts =>
                    prevPosts.map(post =>
                        post.id === postId
                            ? { ...post, likeCount: post.liked ? post.likeCount - 1 : post.likeCount + 1, liked: !post.liked }
                            : post
                    )
                );
            }
        } catch (error) {
            console.error('좋아요 에러:', error);
        }
    };


    // 북마크
    const toggleBookmark = async (postId) => {
        try {
            const response = await fetch(`${baseUrl}/${postId}/bookmark?nickname=${nickname}`, { method: 'POST' });

            if (response.ok) {
                setPosts(prevPosts =>
                    prevPosts.map(post =>
                        post.id === postId
                            ? { ...post, bookmarkCount: post.bookmarked ? post.bookmarkCount - 1 : post.bookmarkCount + 1, bookmarked: !post.bookmarked }
                            : post
                    )
                );
            }
        } catch (error) {
            console.error('북마크 에러:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <View style={styles.container}>
            {/* 게시글 작성 */}
            <TextInput
                style={styles.input}
                placeholder="내용"
                value={newPostContent}
                onChangeText={setNewPostContent}
            />
            <TextInput
                style={styles.input}
                placeholder="해시태그 (ex. #tag1, #tag2)"
                value={newHashtags}
                onChangeText={setNewHashtags}
            />
            <TouchableOpacity style={styles.button} onPress={createPost}>
                <Text style={styles.buttonText}>게시글 작성</Text>
            </TouchableOpacity>

            {/* 검색 기능 */}
            <TextInput
                style={styles.input}
                placeholder="해시태그 검색"
                value={searchTag}
                onChangeText={setSearchTag}
            />
            <TouchableOpacity style={styles.button} onPress={searchByHashtag}>
                <Text style={styles.buttonText}>해시태그 검색</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="작성자 검색"
                value={searchNickname}
                onChangeText={setSearchNickname}
            />
            <TouchableOpacity style={styles.button} onPress={searchByUser}>
                <Text style={styles.buttonText}>작성자 검색</Text>
            </TouchableOpacity>

            {/* 게시글 목록 */}
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                        {editingPost === item.id ? (
                            // 게시글 수정 UI
                            <>
                                <TextInput
                                    style={styles.input}
                                    value={editContent}
                                    onChangeText={setEditContent}
                                />
                                <TextInput
                                    style={styles.input}
                                    value={editHashtags}
                                    onChangeText={setEditHashtags}
                                />
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => updatePost(item.id)}
                                >
                                    <Text style={styles.buttonText}>수정 완료</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => setEditingPost(null)}
                                >
                                    <Text style={styles.buttonText}>취소</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            // 게시글 보기 UI
                            <>
                                <Text style={styles.postText}>{item.content}</Text>
                                <Text style={styles.hashtags}>{item.hashtags.join(' ')}</Text>

                                {/* 좋아요 & 북마크 버튼 */}
                                <View style={styles.row}>
                                    <TouchableOpacity
                                        style={styles.iconButton}
                                        onPress={() => toggleLike(item.id)}
                                    >
                                        <Text>❤️ {item.likeCount}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.iconButton}
                                        onPress={() => toggleBookmark(item.id)}
                                    >
                                        <Text>🔖</Text>
                                    </TouchableOpacity>
                                </View>

                                {/* 게시글 수정 및 삭제 버튼 */}
                                <View style={styles.row}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            setEditingPost(item.id);
                                            setEditContent(item.content);
                                            setEditHashtags(item.hashtags.join(', '));
                                        }}
                                    >
                                        <Text style={styles.buttonText}>수정</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => deletePost(item.id)}
                                    >
                                        <Text style={styles.buttonText}>삭제</Text>
                                    </TouchableOpacity>
                                </View>


                                {/* 댓글 입력 및 작성 */}
                                <TextInput
                                    style={styles.input}
                                    placeholder="댓글 입력"
                                    value={commentText[item.id] || ""}
                                    onChangeText={(text) =>
                                        setCommentText((prev) => ({ ...prev, [item.id]: text }))
                                    }
                                />
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => commentPost(item.id)}
                                >
                                    <Text style={styles.buttonText}>댓글 작성</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: '#aaa',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    postContainer: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    postText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    hashtags: {
        color: '#007bff',
        fontSize: 14,
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    iconButton: {
        padding: 5,
    },
});
