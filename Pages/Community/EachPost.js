import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const baseUrl = 'http://localhost:8080/posts';

export default function EachPost({route}) {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [editHashtags, setEditHashtags] = useState("");
    const [replies, setReplies] = useState(["댓글내용",'댓글내용2']);
    const [newReplyContent, setNewReplyContent] = useState("");
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
            <View >
                {editingPost === posts.id ? (
                    <View style={styles.postContainer}>
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
                    </View>
                ) : (<>
                        <View style={styles.postContainer}>
                            <Text style={styles.postContent}>
                                {/* {posts.content} */}
                                글 내용
                            </Text>
                            <Text style={styles.hashtags}>
                                #태그예시1 #태그예시2
                                {/* {posts.hashtags?.join(' ')} */}
                            </Text>
                        </View>  
                        <View style={styles.btnContainer}>
                            {/* 좋아요 */}
                            <TouchableOpacity style={styles.button} onPress={() => likePost(posts.id)}>
                                <AntDesign name={'like2'} size={25} color={"black"}/>
                            </TouchableOpacity>

                            {/* 북마크 */}
                            <TouchableOpacity style={styles.button} onPress={() => bookmarkPost(posts.id)}>
                                <FontAwesome name={'bookmark'} size={25} color={"black"} />    
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
                            <TouchableOpacity style={styles.button} onPress={() => deletePost(posts.id)}>
                                <AntDesign name={'delete'} size={25} color={"black"} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.replyContainer}>
                            <FlatList
                                data={replies}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (   
                                    <View style={styles.reply}>
                                        <Text style={styles.postContent}>{item}</Text>
                                        <TouchableOpacity>
                                            {/* 여기에 onPRess 댓글 삭제 적용하기& 자기가 작성한 댓글일 때만 삭제 버튼 */}
                                            <AntDesign name={'delete'} size={18} color={"black"} />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                style={{marginVertical:10}}
                            />
                            <View style={styles.newreply}>
                                <TextInput
                                    style={{ ...styles.input,  height:60 , flex:8}}
                                    placeholder="내용"
                                    value={newReplyContent}
                                    onChangeText={setNewReplyContent}
                                    multiline={true}
                                />
                                <TouchableOpacity style={{...styles.replyBtn,flex:1}}>
                                    {/* onPress 댓글 업로드 */}
                                    <FontAwesome name={'send'} size={25} color={"black"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                    </>)}
            </View>
          
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 ,backgroundColor:"white",width:"100%",height:"100%"},
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    input: { borderWidth: 1, padding: 10, marginVertical: 5 },
    btnContainer:{flexDirection:"row"},
    button: { backgroundColor: 'transparent', padding: 10, marginVertical: 5, alignItems: 'center',flex:1 },
    buttonText: { color: 'white', fontWeight: 'bold' },
    postContainer: {
        borderWidth: 1, padding: 10, marginVertical: 5,
        minHeight:200,
        justifyContent:"space-between"
    },
    postContent: { fontSize: 18 },
    hashtags: { color: 'gray' },
    reply: {
        borderBottomWidth: 1, marginVertical: 0, marginHorizontal: 10,
        padding: 10,
        backgroundColor: "white",
        borderColor: "gray",
        minHeight: 50,
        flexShrink: 1,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    newreply: {
        flexDirection: "row",
        alignItems: "center",
        // position: 'absolute',
        // bottom: 0,
        // left:0,
    },
    replyBtn: {
        backgroundColor: "rgb(241, 160, 91)",
        // backgroundColor:"orange",
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10,
        minWidth: "fit-content",
        maxHeight:"fit-content"
    },
    replyContainer: {
        alignItems:"space-between"
    }
});

