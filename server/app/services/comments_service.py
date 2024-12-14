from .connect import connect


@connect
def get_all_comments(cursor, id):
    try:
        cursor.execute(f"SELECT u.login, c.content, c.comment_time FROM comments c JOIN users u ON u.id=c.userId WHERE postId={id}")
        columns = [desc[0] for desc in cursor.description]
        rows = cursor.fetchall()
        return [dict(zip(columns, row)) for row in rows]
    except Exception as e:
        return {"success": False, "message": str(e)}
    

@connect
def send_comment(cursor, id, comment, userId):
    try:
        cursor.execute('INSERT INTO comments(content, userId, postId) VALUES (%s, %s, %s)',
                       (comment.content, userId, id))
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}