import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useAuth } from "../../AuthContext";
import { EXPO_PUBLIC_IPHOST, EXPO_POST_BASE_URL } from "@env";

export default function MyPost({ navigation}) {
    const [myposts, setMyPosts] = useState([]);
    const [posts, setPosts] = useState([]);
    const { token, nickname,userId, isLoading } = useAuth(); 

    // 내가 쓴 게시물 조회
    const fetchmyPosts = async () => {
        try {
            const response = await fetch(`${EXPO_POST_BASE_URL}/user?nickname=${nickname}`);
            const data = await response.json();
            setMyPosts(data);
        } catch (error) {
            console.error('작성자 검색 에러:', error);
        }
    };

    // 북마크 목록 조회
    const fetchBookmarks = async () => {
        try {
            const response = await fetch(`${EXPO_POST_BASE_URL}/bookmarks?nickname=${nickname}`);
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
            <Text style={styles.header}>내가 쓴 글</Text>
            {/* 게시글 목록 */}
            <FlatList
                data={myposts}
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "f5f5f5"
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        paddingLeft: 10
    },
    input: {
        flex: 8, borderWidth: 0, padding: 10, marginVertical: 5,
        backgroundColor: "#E2E2E2",
        borderRadius: 9,
    },
    button: {
        backgroundColor: "rgb(241, 160, 91)",
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10,
        minWidth: 45,
    },
    buttonText: { color: 'black', fontWeight: 'bold' },
    postContainer: {
        flex: 2,
    },
    eachPost: {
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: "white",
        borderColor: "gray",
        minHeight: 120,
        justifyContent: "space-between",
        flex: 1,
        marginBottom: 10,
        borderRadius: 5,
    },
    postContent: {
        fontSize: 14,
        flex: 1,
        flexGrow: 1,
        overflow: "hidden",
    },
    hashtags: {
        color: '#007bff',
        flex: 1,
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 10,
    }
});

