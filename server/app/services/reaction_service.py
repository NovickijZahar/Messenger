from .connect import connect

@connect 
def send_post_like(cursor, postId, userId):
    try:
        cursor.execute(f'''SELECT name FROM reactions WHERE userId={userId} and postId={postId}''')
        res = cursor.fetchone()
        if res is None:
            cursor.execute('''INSERT INTO reactions(name, userId, postId) 
                VALUES (%s, %s, %s)''', ('Лайк', userId, postId))
        elif res[0] == 'Дизлайк':
            cursor.execute(f'DELETE FROM reactions WHERE userId={userId} and postId={postId}')
            cursor.execute('''INSERT INTO reactions(name, userId, postId) 
                VALUES (%s, %s, %s)''', ('Лайк', userId, postId))
        else:
            cursor.execute(f'DELETE FROM reactions WHERE userId={userId} and postId={postId}')
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}
    

@connect 
def send_post_dislike(cursor, postId, userId):
    try:
        cursor.execute(f'''SELECT name FROM reactions WHERE userId={userId} and postId={postId}''')
        res = cursor.fetchone()
        if res is None:
            cursor.execute('''INSERT INTO reactions(name, userId, postId) 
                VALUES (%s, %s, %s)''', ('Дизлайк', userId, postId))
        elif res[0] == 'Лайк':
            cursor.execute(f'DELETE FROM reactions WHERE userId={userId} and postId={postId}')
            cursor.execute('''INSERT INTO reactions(name, userId, postId) 
                VALUES (%s, %s, %s)''', ('Дизлайк', userId, postId))
        else:
            cursor.execute(f'DELETE FROM reactions WHERE userId={userId} and postId={postId}')
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}
    

@connect 
def send_poll_like(cursor, pollId, userId):
    try:
        cursor.execute(f'''SELECT name FROM reactions WHERE userId={userId} and pollId={pollId}''')
        res = cursor.fetchone()
        if res is None:
            cursor.execute('''INSERT INTO reactions(name, userId, pollId) 
                VALUES (%s, %s, %s)''', ('Лайк', userId, pollId))
        elif res[0] == 'Дизлайк':
            cursor.execute(f'DELETE FROM reactions WHERE userId={userId} and pollId={pollId}')
            cursor.execute('''INSERT INTO reactions(name, userId, pollId) 
                VALUES (%s, %s, %s)''', ('Лайк', userId, pollId))
        else:
            cursor.execute(f'DELETE FROM reactions WHERE userId={userId} and pollId={pollId}')
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}
    

@connect 
def send_poll_dislike(cursor, pollId, userId):
    try:
        cursor.execute(f'''SELECT name FROM reactions WHERE userId={userId} and pollId={pollId}''')
        res = cursor.fetchone()
        if res is None:
            cursor.execute('''INSERT INTO reactions(name, userId, pollId) 
                VALUES (%s, %s, %s)''', ('Дизлайк', userId, pollId))
        elif res[0] == 'Лайк':
            cursor.execute(f'DELETE FROM reactions WHERE userId={userId} and pollId={pollId}')
            cursor.execute('''INSERT INTO reactions(name, userId, pollId) 
                VALUES (%s, %s, %s)''', ('Дизлайк', userId, pollId))
        else:
            cursor.execute(f'DELETE FROM reactions WHERE userId={userId} and pollId={pollId}')
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}