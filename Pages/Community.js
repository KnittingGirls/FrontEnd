import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Community from './Pages/Community';

import { useState, useEffect } from 'react';

export default function Community() {
    const [posts, setPosts] = useState([]);
    const [nickname, setNickname] = useState('사용자닉네임');

    // 전체 게시글 조회
    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:8080/posts');
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('게시글 조회 에러:', error);
        }
    };

    // 게시글 작성
    const createPost = async (content, hashtags, image) => {
        const formData = new FormData();
        formData.append('postDto', JSON.stringify({ content, hashtags }));
        formData.append('image', image);

        try {
            await fetch(`http://localhost:8080/posts?nickname=${nickname}`, {
                method: 'POST',
                body: formData,
            });
            fetchPosts();
        } catch (error) {
            console.error('게시글 작성 에러:', error);
        }
    };

    // 게시글 수정
    const updatePost = async (postId, content, hashtags) => {
        try {
            await fetch(`http://localhost:8080/posts/${postId}?nickname=${nickname}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, hashtags }),
            });
            fetchPosts();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    // 게시글 삭제
    const deletePost = async (postId) => {
        try {
            await fetch(`http://localhost:8080/posts/${postId}?nickname=${nickname}`, {
                method: 'DELETE',
            });
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error('게시글 삭제 에러:', error);
        }
    };

    // 해시태그 검색
    const searchByHashtag = async (tag) => {
        try {
            const response = await fetch(`http://localhost:8080/posts/search?tag=${encodeURIComponent(tag)}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('해시태그 검색 에러:', error);
        }
    };

    // 작성자로 검색
    const searchByUser = async (searchNickname) => {
        try {
            const response = await fetch(`http://localhost:8080/posts/user?nickname=${searchNickname}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('작성자로 검색 에러:', error);
        }
    };

    // 좋아요 기능
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

    // 댓글 작성
    const addComment = async (postId, comment) => {
        try {
            await fetch(`http://localhost:8080/posts/${postId}/comment?nickname=${nickname}&content=${comment}`, {
                method: 'POST',
            });
            fetchPosts();
        } catch (error) {
            console.error('댓글 작성 에러:', error);
        }
    };

    // 게시글 스크랩
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

    // 스크랩 목록 조회
    const fetchBookmarks = async () => {
        try {
            const response = await fetch(`http://localhost:8080/posts/bookmarks?nickname=${nickname}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('북마크 목록 에러:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return null;
}

