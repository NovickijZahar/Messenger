from .connect import connect
import bcrypt
import jwt
import datetime
import pytz
import os
from dotenv import load_dotenv


@connect
def get_all_users(cursor):
    cursor.execute("SELECT * FROM users")
    columns = [desc[0] for desc in cursor.description]
    rows = cursor.fetchall()
    return [dict(zip(columns, row)) for row in rows]


def decode_token(token):
    load_dotenv()
    secret_key = os.getenv("SECRET_KEY")
    algorithm = os.getenv("ALGORITHM")
    return jwt.decode(token, secret_key, algorithms=algorithm)


def generate_token(id, login, role):
    load_dotenv()
    secret_key = os.getenv("SECRET_KEY")
    algorithm = os.getenv("ALGORITHM")
    timezone = pytz.timezone('Europe/Minsk')
    payload = {
        'id': id,
        'login': login,
        'role': role,
        'exp': datetime.datetime.now(timezone) + datetime.timedelta(hours=1)
    }
    return jwt.encode(payload, secret_key, algorithm=algorithm)


@connect 
def register(cursor, user):
    try:
        password = user.password.encode('utf-8')
        hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
        cursor.execute('''
            INSERT INTO users(login, password, roleId) VALUES
            (%s, %s, %s);
            ''', (user.login, hashed_password.decode('utf-8'), 1))
        cursor.execute(f'''
            SELECT u.id, u.login, r.name as role 
            FROM users as u
            JOIN roles as r
            ON u.roleId=r.Id
            WHERE u.login='{user.login}';
        ''')
        data = cursor.fetchone()
        token = generate_token(data[0], data[1], data[2])
        return {"id": data[0], "login": data[1], "role": data[3], "token": token}
    except Exception as e:
        return {"success": False, "message": str(e)}


@connect
def login(cursor, user):
    try:
        cursor.execute(f'''
            SELECT u.id, u.login, u.password, r.name as role 
            FROM users as u
            JOIN roles as r
            ON u.roleId=r.Id
            WHERE u.login='{user.login}';
        ''')
        data = cursor.fetchone()
        if bcrypt.checkpw(user.password.encode('utf-8'), data[2].encode('utf-8')):
            token = generate_token(data[0], data[1], data[3])
            return {"id": data[0], "login": data[1], "role": data[3], "token": token}
        return {"success": False, "message": "Неправильный логин или пароль"}
    except Exception as e:
        return {"success": False, "message": "Неправильный логин или пароль"}