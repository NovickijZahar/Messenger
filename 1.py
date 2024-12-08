import jwt
import datetime
import pytz

secret_key = 'your_secret_key'
timezone = pytz.timezone('Europe/Moscow')

payload = {
    'user_id': 123,  
    'username': "werwer",
    'exp': datetime.datetime.now(timezone) + datetime.timedelta(hours=1) 
}

token = jwt.encode(payload, secret_key, algorithm='HS256')

print(token)
print(jwt.decode(token, key=secret_key, algorithms='HS256'))

