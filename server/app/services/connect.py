import psycopg2

def connect(func):
    def wrapper(*args, **kwargs):
        conn_params = {
            'dbname': 'messanger',
            'user': 'postgres',
            'password': '12345678',
            'host': 'localhost', 
            'port': '5432'
        }
        try:
            conn = psycopg2.connect(**conn_params)
            cursor = conn.cursor()
            result = func(cursor=cursor, *args, **kwargs)
            conn.commit()
            return result
        except Exception as e:
            print("Ошибка:", e)
            conn.rollback()
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()
    return wrapper