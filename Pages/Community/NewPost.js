import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const baseUrl = 'http://localhost:8080/posts';

export default function NewPost({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState("");
    const [newHashtags, setNewHashtags] = useState("");

    const nickname = '서자영';

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
            // navigation.navigate("AllPosts"); 
        } catch (error) {
            console.error('게시글 작성 에러:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>게시물 작성</Text>

            {/* 게시글 작성 */}
            <TextInput
                style={styles.input}
                placeholder="내용"
                value={newPostContent}
                onChangeText={setNewPostContent}
            />
            <TextInput
                style={styles.input}
                placeholder="해시태그 (ex. #태그1, #태그2)"
                value={newHashtags}
                onChangeText={setNewHashtags}
            />
            <TouchableOpacity style={styles.button} onPress={createPost}>
                <Text style={styles.buttonText}>게시글 작성</Text>
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

