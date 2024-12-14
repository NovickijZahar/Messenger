from .connect import connect


@connect
def send_message(cursor, userId, message):
    try:
        cursor.execute('''
            INSERT INTO messages(content, senderId, receiverId) VALUES
            (%s, %s, %s)
        ''', (message.content, userId, message.receiverId))
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}
    

@connect 
def get_chat(cursor, myId, otherId):
    try:
        cursor.execute('''
            SELECT 
                id, message_time, edit_time, 
                content, senderId, receiverId 
            FROM messages 
            WHERE (senderId = %s AND receiverId = %s) OR (senderId = %s AND receiverId = %s)
            ORDER BY message_time ASC;
        ''', (myId, otherId, otherId, myId))
        columns = [desc[0] for desc in cursor.description]
        rows = cursor.fetchall()
        return [dict(zip(columns, row)) for row in rows]
        
    except Exception as e:
        return {"success": False, "message": str(e)}
    

@connect
def edit_message(cursor, id, message, userId):
    try:
        cursor.execute('UPDATE messages SET content=%s WHERE id=%s',
                       (message.content, id))
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}


@connect 
def remove_message(cursor, id, userId):
    try:
        cursor.execute(f'DELETE FROM messages WHERE id={id}')
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}