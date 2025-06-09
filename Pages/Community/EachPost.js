import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet,Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAuth } from "../../AuthContext";
import { EXPO_PUBLIC_IPHOST, EXPO_POST_BASE_URL } from "@env";

export default function EachPost({ navigation,route }) {
    // const navigate = useNavigation();
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [editHashtags, setEditHashtags] = useState("");
    const [commentText, setCommentText] = useState({});
    const { token, nickname, isLoading } = useAuth(); 
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState();

    const postId = route.params.postId;
    const IconSize = 20;
    const convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result.split(',')[1]); // get base64 string only
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
      };
    const fetchPosts = async () => {
        try {
            const response = await fetch(`http://${EXPO_PUBLIC_IPHOST}:8080/posts/${postId}`); //이 주소가 맞는지 확인 필요함
            const data = await response.json();
            // const replyres = await fetch(`${baseUrl}/${postId}/comment`); 
            // const replydata = await replyres.json();
            setPosts(data);
            console.log(data);
            try {
                const fetchedImages = await Promise.all(
                    data.images.map(async (url) => {
                        const response = await fetch(`http://${EXPO_PUBLIC_IPHOST}:8080${url}`);
                        
                        const blob = await response.blob();
                        // console.log(blob);
                        // Convert blob to base64
                        const base64 = await convertBlobToBase64(blob);
                        return `data:${blob.type};base64,${base64}`;
                    })
                );
                // console.log(fetchedImages[1]);
                setImages(fetchedImages);
                // console.log(images[0]);
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        } catch (error) {
            console.error('게시글 조회 에러:', error);
        }
    };
    // 게시글 수정
    const updatePost = async (postId) => {
        try {
            await fetch(`http://${EXPO_PUBLIC_IPHOST}:8080/posts/${postId}?nickname=${nickname}`, {
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
            await fetch(`http://${EXPO_PUBLIC_IPHOST}:8080/posts/${postId}?nickname=${nickname}`, {
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
            await fetch(`http://${EXPO_PUBLIC_IPHOST}:8080/posts/${postId}/like?nickname=${nickname}`, { method: 'POST' });
            fetchPosts();
        } catch (error) {
            console.error('좋아요 에러:', error);
        }
    };

    // 게시글 북마크
    const bookmarkPost = async (postId) => {
        try {
            await fetch(`http://${EXPO_PUBLIC_IPHOST}:8080/posts/${postId}/bookmark?nickname=${nickname}`, { method: 'POST' });
            fetchPosts();
        } catch (error) {
            console.error('북마크 에러:', error);
        }
    };

    // 북마크 목록 조회
    const fetchBookmarks = async () => {
        try {
            const response = await fetch(`http://${EXPO_PUBLIC_IPHOST}:8080/posts/bookmarks?nickname=${nickname}`);
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

            const response = await fetch(`http://${EXPO_PUBLIC_IPHOST}:8080/posts/${postId}/comment?nickname=${encodedNickname}&content=${encodedContent}`, {
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
            {editingPost === posts.id && posts.authorNickname==nickname ? (
                <View style={{flex:12}}>
                <View style={{...styles.postContainer,flex:3}}>
                    <Text style={{ marginBottom: 4, fontWeight: "bold", fontSize: 15, flex: 1 }}>{posts.authorNickname}</Text>
                    <TextInput
                        style={{ ...styles.postContent,flex:4 }}
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
                   
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'flex-end', flex: 1 }}>
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
                    <View style={{flex:5,flexShrink:4}}></View>
                </View>) : (<>
                    <View style={styles.postContainer}>
                        <Text style={{ marginBottom: 4, fontWeight: "bold",fontSize:15,flex:1 }}>{posts.authorNickname}</Text>
                        <Text style={styles.postContent}>
                            {posts.content}
                        </Text>
                        {images && !loading ?
                            <View style={styles.imageContainer}>
                                {images.map((uri, index) => (
                                    <Image key={index} source={{uri:uri}} style={styles.postImage} />
                                ))} 
                            </View>
                            : <></>}
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
                        <TouchableOpacity style={styles.button} onPress={()=>{if(posts.authorNickname==nickname){deletePost(posts.id)}}}>
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
                        <View style={{flex:5}}></View>
                    </View>
                    <View style={styles.newreply}>
                        <TextInput
                            style={{ ...styles.input, height: "fit-content",minHeight:60, flex: 8 }}
                            placeholder="댓글 입력"
                            value={commentText[posts.id] || ""}
                            onChangeText={(text) =>
                                setCommentText((prev) => ({ ...prev, [posts.id]: text }))
                            }
                            multiline={true}
                        />
                        <TouchableOpacity style={{ ...styles.replyBtn,minHeight:60, flex: 1 }} onPress={() => commentPost(posts.id)}>
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
    imageContainer: {
        height: 100,
        // flex: 3, 
        flexDirection: "row"
    },
    postImage: {
        width: "100",
        height: "100",
        marginTop: 12,
        marginBottom: 12,
        marginRight: 4
        // backgroundColor:"red"
    },
    buttonText: { color: 'black', fontWeight: 'bold' },
    postContainer: {
        // borderWidth: 1,
        backgroundColor:"white",
        padding: 10,
        marginVertical: 5,
        minHeight: 250,
        justifyContent:"space-between"
    },
    commentAuthor: {
        fontSize: 14,
        marginBottom:3,
    },
    postContent: {
        fontSize: 13,
        flex: 5,
        flexShrink: 3,
        textAlignVertical:'top'
    },
    hashtags: {
        color: '#007bff',
        textAlignVertical: 'top'
     },
    reply: {
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
        marginVertical: 0,
        // marginHorizontal: 10,
        padding: 10,
        paddingVertical:15,
        backgroundColor: "white",
        borderColor: "gray",
        minHeight: 50,
        height: "fit-content",
        // flex: 1,
        // flexGrow:1,
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
        width: "auto",
        height:"auto",
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

