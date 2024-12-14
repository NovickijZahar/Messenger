import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { my_profile, update_profile } from '../http/userApi';
import { create_post, edit_post, my_posts, remove_post } from '../http/postApi';
import { send_post_dislike, send_post_like } from '../http/reactionApi';
import { get_all_comments, send_commnet } from '../http/comments';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedPost, setSelectPost] = useState('');

    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');

    useEffect(() => {
        my_profile().then(data => {
            setProfile(data);
            setBio(data.bio);
            setEmail(data.email);
            setTelephone(data.telephone);
        });
        my_posts().then(data => {
            setPosts(data);
        });
    }, []);

    const handleLike = (postId) => {
        send_post_like(postId).then(() => {
            my_posts().then(data => {
                setPosts(data);
            });
        });
    };

    const handleDislike = (postId) => {
        send_post_dislike(postId).then(() => {
            my_posts().then(data => {
                setPosts(data);
            });
        });
    };


    const handleDeletePost = (id) => {
        remove_post(id).then(() => {
            my_profile().then(data => {
                setProfile(data);
            });
            my_posts().then(data => {
                setPosts(data);
            });
        });
    }

    const handleNewPost = () => {
        if (newPostContent.trim()) {
            create_post(newPostContent).then(() => {
                setNewPostContent('');
                setIsModalOpen(false);
                my_profile().then(data => {
                    setProfile(data);
                });
                my_posts().then(data => {
                    setPosts(data);
                });
            });
        }
    };

    const handleEditPost = () => {
        if (newPostContent.trim()) {
            edit_post(selectedPost, newPostContent).then(() => {
                setNewPostContent('');
                setIsModalOpen(false);
                my_profile().then(data => {
                    setProfile(data);
                });
                my_posts().then(data => {
                    setPosts(data);
                });
            });
        }
    };

    const handleUpdateProfile = () => {
        if (!/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            alert("Введите корректный адрес электронной почты.");
            return;
        }
        if (!/^\+\d{11,18}$/.test(telephone)) {
            alert("Введите корректный номер телефона, начиная с '+'.");
            return;
        }
        update_profile(bio, email, telephone).then(() =>{
            my_profile().then(data => {
                setProfile(data);
            });
        });
        setIsProfileModalOpen(false);
    };


    const openComments = (id) => {
        get_all_comments(id).then(data=>{
            setComments(data);
        });
        setSelectPost(id); 
        setIsCommentsModalOpen(true);
    }

    const handleAddComment = () => {
        send_commnet(selectedPost, newComment).then(()=>{
            get_all_comments(selectedPost).then(data=>{
                setComments(data);
            });
            my_posts().then(data => {
                setPosts(data);
            });
        });
    }

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="profile-container">
            <div className="profile-info">
                <h1 className="profile-login">{profile.login}</h1>
                <p className="profile-bio">{profile.bio || 'Статус не задан'}</p>
                <div className="profile-details">
                    <p><strong>Email:</strong> {profile.email || 'Не указан'}</p>
                    <p><strong>Телефон:</strong> {profile.telephone || 'Не указан'}</p>
                    <p><strong>Присоединился:</strong> {new Date(profile.join_date).toLocaleDateString()}</p>
                    <p><strong>Количество постов:</strong> {profile.post_count}</p>
                    <p><strong>Подписки:</strong> {profile.subscribers_number}</p>
                    <p><strong>Подписчики:</strong> {profile.subscriptions_number}</p>
                    <button onClick={() => setIsProfileModalOpen(true)}>Редактировать</button>
                </div>
            </div>
            <div className="posts-section">
                <h2>User Posts</h2>
                <button className="new-post-button" onClick={() => {setIsModalOpen(true); setIsEdit(false)}}>Create New Post</button>
                {posts.length === 0 ? (
                    <p>No posts available.</p>
                ) : (
                    posts.map((post, index) => (
                        <div key={index} className="post">
                            <div className="post-header">
                                <div className="post-actions user-actions">
                                    <button onClick={() => {
                                        setIsModalOpen(true); 
                                        setIsEdit(true); 
                                        setSelectPost(post.id)
                                        setNewPostContent(post.content)}}>✏️Edit</button>
                                    <button onClick={() => handleDeletePost(post.id)}>🗑️Del</button>
                                </div>
                            </div>
                            <p className="post-content">{post.content}</p>
                            <p className="post-date">{new Date(post.post_date).toLocaleString()}</p>
                            {post.post_edit && (
                                <p className="post-edit-time">
                                    Edited: {new Date(post.post_edit).toLocaleString()}
                                </p>
                            )}
                            <div className="post-actions">
                                <button style={{backgroundColor: post.reaction_name === 'Лайк' ? 'blue' : 'gray'}} onClick={() => handleLike(post.id)}>👍 Like({post.like_count})</button>
                                <button style={{backgroundColor: post.reaction_name === 'Дизлайк' ? 'blue' : 'gray'}} onClick={() => handleDislike(post.id)}>👎 Dislike({post.dislike_count})</button>
                                <button onClick={() => openComments(post.id)}>💬 Comment({post.comment_count})</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Create New Post</h3>
                        <textarea
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            placeholder="What's on your mind?"
                        />
                        <div className="modal-actions">
                            {isEdit 
                            ? <button onClick={handleEditPost}>Редактировать</button>
                            : <button onClick={handleNewPost}>Опубликовать</button>
                            }
                            <button onClick={() => {
                                setIsModalOpen(false);
                                setSelectPost('');
                                setNewPostContent('')}}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
            {isProfileModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Edit Profile</h3>
                        <div className="modal-fields">
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Bio"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                            <input
                                type="text"
                                value={telephone}
                                onChange={(e) => setTelephone(e.target.value)}
                                placeholder="Telephone"
                            />
                        </div>
                        <div className="modal-actions">
                            <button onClick={handleUpdateProfile}>Сохранить</button>
                            <button onClick={() => {
                                setIsProfileModalOpen(false);
                            }}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
            {isCommentsModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Add Comment</h3>
                        {comments.map((comment, index) => (
                            <div key={index} className="comment-item">
                                <p><strong>{comment.login}</strong> <span style={{fontSize: 'x-small'}}>({new Date(comment.comment_time).toLocaleString()})</span>: {comment.content}</p>
                            </div>
                        ))}
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment here..."
                        />
                        <div className="modal-actions">
                            <button onClick={handleAddComment}>Submit</button>
                            <button onClick={() => {
                                setIsCommentsModalOpen(false);
                                setNewComment('');
                            }}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;