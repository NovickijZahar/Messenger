from .connect import connect

@connect
def subscribe(cursor, rId, sId):
    try:
        cursor.execute('''
            INSERT INTO subscriptions (authorId,subscriberId) VALUES
            (%s, %s);''', (rId, sId))
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}
    
@connect
def desubscribe(cursor, rId, sId):
    try:
        cursor.execute('''
            DELETE FROM subscriptions WHERE
            authorId=%s and subscriberId=%s''', (rId, sId))
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}
    

@connect
def check_sub(cursor, rId, sId):
    try:
        res = []
        cursor.execute('''
            SELECT * FROM subscriptions WHERE
            authorId=%s and subscriberId=%s''', (rId, sId))
        res.append(1 if cursor.fetchone() else 0)
        cursor.execute('''
            SELECT * FROM subscriptions WHERE
            authorId=%s and subscriberId=%s''', (sId, rId))
        res.append(1 if cursor.fetchone() else 0)
        return res
    except Exception as e:
        return {"success": False, "message": str(e)}