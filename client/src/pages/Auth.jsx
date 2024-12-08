import { useContext, useState } from "react";
import { Context } from "..";
import { useLocation, Link } from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTER_ROUTE } from "../consts";
import * as auth from "../http/userApi";


const Auth = () => {
    const { user } = useContext(Context);
    const location = useLocation();

    const isLogin = location.pathname === LOGIN_ROUTE;
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{

            let data;
            if (isLogin){
                data = await auth.login(login, password);
            }
            else{
                data = await auth.register(login, password);
            }
            user.setUser(data);
            window.location.href = MAIN_ROUTE;
        }
        catch (err) {
            alert(err.response);
        }
    };

    return (<div className="container">
                <div className="auth-container">
                    <h2>{isLogin ? "Авторизация" : "Регистрация"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="login">Электронная почта:</label>
                            <input
                                type="text"
                                id="login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                required
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />
                        </div>
                        <button type="submit">Войти</button>
                        {isLogin ?
                            <Link className="info" to={REGISTER_ROUTE}>Нет аккаунта? Создать</Link>
                            :
                            <Link className="info" to={LOGIN_ROUTE}>Уже есть аккаунт? Войти</Link>
                        }
                    </form>
                </div>
            </div>)
}

export default Auth;