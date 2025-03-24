import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet ,Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
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
            {/* <Text style={styles.header}>커뮤니티</Text> */}
            {/* <TouchableOpacity onPress={() => { navigation.navigate("NewPost") }}><Text>작성하기</Text></TouchableOpacity> */}
            {/* 해시태그 검색 */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="검색(#ajour)"
                    value={searchTag}
                    onChangeText={setSearchTag}
                />
                <TouchableOpacity onPress={searchByHashtag} style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <AntDesign name={'search1'} size={25} color={"black"}/>
                </TouchableOpacity>
            </View>
            

            {/* 게시글 목록 */}
            <View style={styles.postContainer}>
                <FlatList
                    data={posts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.eachPost} onPress={() => { navigation.navigate("EachPost", {postId:item.id}) }}>
                            <Text style={{marginBottom:10, fontWeight:"bold",fontSize:15}}>{item.authorNickname}</Text>
                            {/* <Image source={item.imageData} style={{ flex: 2,backgroundColor:"gray",width:"auto"}} /> */}
                            <View style={{flex:1}}>
                                <Text style={styles.postContent}>{item.content}</Text>
                                <Text style={styles.hashtags}>{item.hashtags?.join(' ')}</Text>
                                <Text style={{flex:1}}>❤️ {item.likeCount}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            {/* 북마크 목록 */}
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.button} onPress={fetchBookmarks}>
                    <FontAwesome name={'bookmark'} size={25} color={"black"} />  
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("NewPost") }}><AntDesign name={'edit'} size={25} color={"black"} /> </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor:"f5f5f5"
    },
    searchContainer: {
        flexDirection: 'row',
        padding:10,
    },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    input: {
        flex: 8, borderWidth: 0, padding: 10, marginVertical: 5,
        backgroundColor: "#E2E2E2",
        borderRadius: 9,
    },
    button: {
        backgroundColor: "rgb(241, 160, 91)",
        // backgroundColor:"orange",
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10,
        minWidth:45,
    },
    buttonText: { color: 'black', fontWeight: 'bold' },
    postContainer: {
        flex:2,
        flexDirection: "row",
        // flexWrap:"wrap",
    },
    eachPost: {
        marginHorizontal: 10,
        padding:10,
        backgroundColor: "white",
        borderColor:"gray",
        // minHeight: 220,
        minHeight:120,  
        justifyContent: "space-between",
        flex: 1,
        marginBottom: 10,
        borderRadius: 5,
    },
    postContent: {
        fontSize: 15,
        flex:1,
        flexGrow: 1,
        overflow:"hidden",
    },
    hashtags: {
        color: '#007bff',
        flex:1,
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 10,
    }
});

