import { useEffect, useState } from "react";
import { delete_message, edit_message, get_chat, send_message } from "../http/messages";
import { useParams } from "react-router-dom";
import "../styles/Messages.css";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const [editMessage, setEditMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [messageId, setMessageId] = useState(0);

    const { id } = useParams();
    
    useEffect(() => {
        get_chat(id).then(data => {
            setMessages(data || []);
        
    }, [])
    });

    const handleSendMessage = async () => {
        await send_message(id, newMessage);
    };

    const handleEditMessage = (id) => {
        setMessageId(id);
        setModalVisible(true);
    };

    const handleDeleteMessage = async (id) => {
        await delete_message(id);
    };

    const handleUpdateMessage = async () => {
        if (editMessage.trim()){
            edit_message(messageId, editMessage).then(() => {
                setModalVisible(false);
                setEditMessage('');
            });
        }
    };

    
    return (
        <div className="chat-wrapper">
            <div className="chat-header">Chat</div>
            <div className="message-list">
                {messages.length === 0 ? (
                    <div className="no-messages">No messages yet</div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="message">
                            <strong>{msg.receiverid == id ? 'Them' : 'Me'}:</strong> 
                            {msg.receiverid != id &&
                                <div className="message-actions">
                                    <button style={{backgroundColor: 'bisque'}} onClick={() => handleEditMessage(msg.id)}>Edit</button>
                                    <button style={{backgroundColor: 'red'}} onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
                                </div>
                            }
                            {msg.content}
                            <div style={{fontSize: 'xx-small'}}>{new Date(msg.message_time).toLocaleString()}</div>
                            {msg.edit_time && <div style={{fontSize: 'xx-small'}}>Изм: {new Date(msg.edit_time).toLocaleString()}</div>}
                        </div>
                    ))
                )}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="input"
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage} className="send-button">Send</button>
            </div>

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Message</h2>
                        <input
                            type="text"
                            value={editMessage}
                            onChange={(e) => setEditMessage(e.target.value)}
                        />
                        <button onClick={handleUpdateMessage}>Update</button>
                        <button onClick={() => setModalVisible(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Messages;