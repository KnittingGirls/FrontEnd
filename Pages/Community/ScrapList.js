import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const baseUrl = 'http://localhost:8080/posts';

export default function ScrapList({ navigation}) {
    const [posts, setPosts] = useState([]);
    const nickname = '서자영';

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
        fetchBookmarks();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>스크랩</Text>

            {/* 북마크크 목록 */}
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
               renderItem={({ item }) => (
                    <TouchableOpacity style={styles.postContainer} onPress={() => { navigation.navigate("EachPost", {postId:item.id}) }}>
                        <View style={{flex:7,justifyContent:'space-between'}}>
                            <Text style={styles.postContent}>{item.content}</Text>
                            <Text style={styles.hashtags}>{item.hashtags?.join(' ')}</Text>
                        </View>
                        <FontAwesome name={'image'} size={40} color={"black"} style={{ flex: 1, }} />
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
        backgroundColor: "white"
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    header: { fontSize: 24, fontWeight: 'bold', margin: 10,paddingLeft:10 },
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
        minWidth: 45,
    },
    buttonText: { color: 'black', fontWeight: 'bold' },
    postContainer: {
        borderBottomWidth: 1, marginVertical: 0, marginHorizontal: 10,
        padding: 10,
        backgroundColor: "white",
        borderColor: "gray",
        minHeight: 100,
        flexShrink: 1,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    postContent: { fontSize: 15 },
    hashtags: { color: 'gray' },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 10,
    }
});

