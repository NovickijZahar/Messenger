from .connect import connect


@connect
def get_all_posts(cursor):
    cursor.execute("SELECT * FROM posts")
    columns = [desc[0] for desc in cursor.description]
    rows = cursor.fetchall()
    return [dict(zip(columns, row)) for row in rows]


@connect
def get_user_posts(cursor, userId, myId):
    cursor.execute(f'''       
            SELECT 
                p.id, 
                p.content, 
                p.post_date, 
                p.post_edit, 
                p.like_count, 
                p.dislike_count, 
                p.comment_count, 
                r.name AS reaction_name
            FROM posts p
            LEFT JOIN reactions r ON p.id = r.postId AND r.userId = {myId} 
            WHERE p.userId = {userId}
            ORDER BY p.post_date DESC;
            ''')
    columns = [desc[0] for desc in cursor.description]
    rows = cursor.fetchall()
    return [dict(zip(columns, row)) for row in rows]


@connect
def create_post(cursor, userId, post):
    try:
        cursor.execute('''
            INSERT INTO posts(content, userId) VALUES 
            (%s, %s);
        ''', (post.content, userId))
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}
    

@connect 
def update_post(cursor, id, userId, post):
    try:
        cursor.execute('''
            UPDATE posts SET content=%s
            WHERE id=%s and userId=%s
            ''', (post.content, id, userId))
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}
    

@connect
def remove_post(cursor, id, userId):
    try:
        cursor.execute('''
        DELETE FROM posts
        WHERE id=%s and userId=%s
        ''', (id, userId))
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}