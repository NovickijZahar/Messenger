from .connect import connect 

@connect 
def get_user_polls(cursor, userId):
    cursor.execute(f'''
        SELECT p.id AS poll_id, p.title AS poll_title, 
            p.start_date, p.end_date, c.title AS choice_title
        FROM polls p
        JOIN choices c ON p.id = c.pollId
        WHERE p.userId = {userId}
    ''')
    res = cursor.fetchall()
    data = {}

    for row in res:
        poll_id = row[0]
        poll_title = row[1]
        start_date = row[2]
        end_date = row[3]
        choice_title = row[4]
        if poll_id not in data:
            data[poll_id] = {
                "title": poll_title,
                "start_date": start_date,
                "end_date": end_date,
                "choices": []
            }
        if choice_title:
            data[poll_id]["choices"].append({"title": choice_title})

    return data


@connect
def create_poll(cursor, userId, poll):
    try:
        cursor.execute('''
            INSERT INTO polls (title, description, userId) VALUES
            (%s, %s, %s) RETURNING id; 
        ''', (poll.title, poll.description, userId))
        pollId = cursor.fetchone()[0]
        for choice in poll.choices:
            cursor.execute('''
                INSERT INTO choices(title, pollId) VALUES 
                (%s, %s)
            ''', (choice, pollId))
        return {"success": True} 
    except Exception as e:
        return {"success": False, "message": str(e)}
    

@connect 
def remove_poll(cursor, id, userId):
    try:
        cursor.execute('''
        DELETE FROM polls
        WHERE id=%s and userId=%s
        ''', (id, userId))
        return {"success": True}
    except Exception as e:
        return {"success": False, "message": str(e)}