import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const baseUrl = 'http://localhost:8080/posts';
import { useAuth } from "../../AuthContext";

export default function EachPost({ navigation,route }) {
    // const navigate = useNavigation();
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [editHashtags, setEditHashtags] = useState("");
    const [commentText, setCommentText] = useState({});
    const { token, nickname, isLoading } = useAuth(); 
    const postId = route.params.postId;
    const IconSize = 20;
    const fetchPosts = async () => {
        try {
            const response = await fetch(`${baseUrl}/${postId}`); //이 주소가 맞는지 확인 필요함
            const data = await response.json();
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
            navigation.replace('AllPosts');
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
    // 댓글
    const commentPost = async (postId) => {
        if (!commentText[postId]?.trim()) return;
        try {
            const encodedContent = encodeURIComponent(commentText[postId]);
            const encodedNickname = encodeURIComponent(nickname);

            const response = await fetch(`${baseUrl}/${postId}/comment?nickname=${encodedNickname}&content=${encodedContent}`, {
                method: 'POST',
            });

            if (!response.ok) throw new Error("댓글 작성 실패");

            const newComment = await response.json();

            setCommentText((prev) => ({ ...prev, [postId]: "" }));
        } catch (error) {
            console.error("댓글 작성 에러:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <View style={styles.container}>
            {editingPost === posts.id ? (
                <View style={{...styles.postContainer}}>
                    <Text style={{ marginBottom: 4, fontWeight: "bold", fontSize: 15, flex: 1 }}>{posts.authorNickname}</Text>
                    <TextInput
                        style={{ ...styles.postContent }}
                        value={editContent}
                        onChangeText={setEditContent}
                        placeholder="새 내용"
                        multiline={true}
                    />
                    <TextInput
                        style={{ ...styles.hashtags,flex:1 }}
                        value={editHashtags}
                        onChangeText={setEditHashtags}
                        placeholder="해시태그"
                    />
                    <View style={{flexDirection:"row",justifyContent:'flex-end'}}>
                        <TouchableOpacity
                            style={styles.editBtn}
                            onPress={() => updatePost(postId)}
                        >
                            <Text style={styles.buttonText}>수정 완료</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editBtn} onPress={() => setEditingPost(null)}>
                            <Text style={styles.buttonText}>취소</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (<>
                    <View style={styles.postContainer}>
                        <Text style={{ marginBottom: 4, fontWeight: "bold",fontSize:15,flex:1 }}>{posts.authorNickname}</Text>
                        <Text style={styles.postContent}>
                            {posts.content}
                        </Text>
                        <Text style={styles.hashtags}>
                            {posts.hashtags?.join(' ')}
                        </Text>
                    </View>  
                    <View style={styles.btnContainer}>
                        {/* 좋아요 */}
                        <TouchableOpacity style={styles.button} onPress={() => likePost(posts.id)}>
                            <AntDesign name={'heart'} size={IconSize} color={"red"} /> 
                            <Text>{posts.likeCount}</Text>
                            {/* 만일 눌렀다면 아래로 기본은 빈 하트로 */}
                            {/* <AntDesign name={'heart'} size={25} color={"red"} /> */}
                        </TouchableOpacity>

                        {/* 북마크 */}
                        <TouchableOpacity style={styles.button} onPress={() => bookmarkPost(posts.id)}>
                            <FontAwesome name={'bookmark'} size={IconSize} color={"black"} />    
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
                            <AntDesign name={'edit'} size={IconSize} color={"black"} />    
                        </TouchableOpacity>

                        {/* 삭제 버튼 */}
                        <TouchableOpacity style={styles.button} onPress={() => deletePost(posts.id)}>
                            <AntDesign name={'delete'} size={IconSize} color={"black"} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.replyContainer}>
                        {posts.comments && posts.comments.length > 0 && (
                            posts.comments.map((comment) => (
                                <View key={comment.id} style={styles.reply}>
                                    <Text style={styles.commentAuthor}>{comment.author.nickname}</Text>
                                    <Text style={styles.postContent}>{comment.content}</Text>
                                </View>
                            ))
                        )}
                    </View>
                    <View style={styles.newreply}>
                        <TouchableOpacity style={{ ...styles.replyBtn, flex: 1 }} onPress={() => navigation.replace('AllPosts')}>
                            <AntDesign name={'back'} size={25} color={"black"} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.newreply}>
                        <TextInput
                            style={{ ...styles.input, height: 60, flex: 8 }}
                            placeholder="댓글 입력"
                            value={commentText[posts.id] || ""}
                            onChangeText={(text) =>
                                setCommentText((prev) => ({ ...prev, [posts.id]: text }))
                            }
                            multiline={true}
                        />
                        <TouchableOpacity style={{ ...styles.replyBtn, flex: 1 }} onPress={() => commentPost(posts.id)}>
                            <FontAwesome name={'send'} size={25} color={"black"} />
                        </TouchableOpacity>
                    </View>
                </>)}
           
          
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5',width:"100%",height:"100%"},
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    input: {
        flex: 8,
        borderWidth: 0,
        padding: 10,
        marginVertical: 5,
        backgroundColor: "white",
        borderRadius: 9,
    },
    btnContainer: {
        flexDirection: "row",
        backgroundColor: "white"
    },
    button: {
        backgroundColor: 'transparent',
        padding: 10, marginVertical: 5,
        alignItems: 'center', flex: 1
    },
    editBtn: {
        backgroundColor: "rgb(241, 160, 91)",
        // backgroundColor:"orange",
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10,
        Width: 60,
    },
    buttonText: { color: 'black', fontWeight: 'bold' },
    postContainer: {
        // borderWidth: 1,
        backgroundColor:"white",
        padding: 10,
        marginVertical: 5,
        minHeight: 200,
        justifyContent:"space-between"
    },
    commentAuthor: {
        fontSize: 14,
        marginBottom:3,
    },
    postContent: {
        fontSize: 13,
        flex: 5,
        flexShrink:3,
    },
    hashtags: { color: '#007bff' },
    reply: {
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        marginVertical: 0,
        // marginHorizontal: 10,
        padding: 10,
        backgroundColor: "white",
        borderColor: "gray",
        minHeight: 50,
        // flex: 1,
        flexGrow:1,
        justifyContent: "space-between",
        // flexDirection: "row"
    },
    newreply: {
        flexDirection: "row",
        alignItems: "center",
        // position: 'absolute',
        // bottom: 4,
        // left:"center",
        flex: 1,
        
    },
    replyBtn: {
        backgroundColor: "rgb(241, 160, 91)",
        // backgroundColor:"orange",
        padding: 10,
        // marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        // marginLeft: 10,
        width: "100%",
        height:"100%",
        // minWidth: "fit-content",
        // maxHeight:"fit-content",
        justifyContent: "center",
        alignContent:"center"
    },
    replyContainer: {
        // alignItems: "space-between",
        flex: 4,
        marginTop: 5,
        overflow: 'scroll',
        // marginHorizontal:5,
    }
});

