import { Link } from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "../consts";
import { observer } from 'mobx-react-lite';
import { useContext } from "react";
import { Context } from "..";
import "../styles/NavBar.css";


const NavBar = observer(() => {
    const { user } = useContext(Context);

    const logOut = () =>{
        user.setUser({});
        user.setAuth(false);
        localStorage.removeItem('token');
    }


    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to={MAIN_ROUTE} className="navbar-logo">
                    Мессенджер
                </Link>
                {user.isAuth ?
                <ul className="navbar-menu">
                    <li>
                        <Link to={PROFILE_ROUTE} className="navbar-logo">
                            {user.user.login}
                        </Link>
                    </li>
                    <li>
                        <Link to={MAIN_ROUTE} onClick={() => logOut()} className="navbar-link">Выйти</Link>
                    </li>
                </ul>
                :
                <ul className="navbar-menu">
                    <li>
                        <Link to={REGISTER_ROUTE} className="navbar-logo">
                            Регистрация
                        </Link>
                    </li>
                    <li>
                        <Link to={LOGIN_ROUTE} className="navbar-logo">
                            Авторизация
                        </Link>
                    </li>
                </ul>
                }
            </div>
        </nav>
      );
});

export default NavBar;