import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get_profile } from "../http/userApi";
import { all_posts } from "../http/postApi";
import { MAIN_ROUTE, MESSAGES_ROUTE, USERS_ROUTE } from "../consts";
import { send_post_dislike, send_post_like } from "../http/reactionApi";
import { Context } from "..";
import { desubscribe, subscribe } from "../http/subscription";
import { get_all_comments, send_commnet } from "../http/comments";


const UserProfile = () => {
    const { id } = useParams();
    const user = useContext(Context);
    const navigate = useNavigate(); 
    const [profile, setProfile] = useState([]);
    const [posts, setPosts] = useState([]);

    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
    const [selectedPost, setSelectPost] = useState('');
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        get_profile(id).then(data => {
            if (data == null) {
                navigate(MAIN_ROUTE);
            }
            setProfile(data);
        });
        all_posts(id).then(data => {
            setPosts(data);
        });
    }, []);

    const handleLike = (postId) => {
        send_post_like(postId).then(() => {
            all_posts(id).then(data => {
                setPosts(data);
            });
        });
    };

    const handleDislike = (postId) => {
        send_post_dislike(postId).then(() => {
            all_posts(id).then(data => {
                setPosts(data);
            });
        });
    };

    const handleSubscribe = (id) => {
        subscribe(id).then(() => {
            get_profile(id).then(data => {
                setProfile(data);
            });
        });
    }

    const handleDesubscribe = (id) => {
        desubscribe(id).then(() => {
            get_profile(id).then(data => {
                setProfile(data);
            });
        });
    }

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
            all_posts(id).then(data => {
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
                    {user.user.user.id != id && 
                    <div>
                        <button onClick={() => navigate(MESSAGES_ROUTE+'/'+profile.id)}>Написать</button>
                        <div style={{display: "flex", marginTop: '10px', gap: '10px'}}>
                            <button onClick={() => handleSubscribe(profile.id)}>Подписаться</button>
                            <button onClick={() => handleDesubscribe(profile.id)}>Отписаться</button>
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div className="posts-section">
                <h2>User Posts</h2>
                {posts.length === 0 ? (
                    <p>No posts available.</p>
                ) : (
                    posts.map((post, index) => (
                        <div key={index} className="post">
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
}

export default UserProfile;