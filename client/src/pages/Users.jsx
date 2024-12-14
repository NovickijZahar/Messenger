import { useEffect, useState } from "react";
import { get_all_users } from "../http/userApi";
import '../styles/Users.css'
import { Link } from "react-router-dom";
import { USERS_ROUTE } from "../consts";

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        get_all_users().then(data => {
            setUsers(data);
        })
    }, []);

    return (
        <div className="container">
            {users.map((user, index) => (
              <div key={index} className="card" onClick={() => window.location.href = USERS_ROUTE+'/'+user.id}>
                  <h2>Login: {user.login}</h2>
                  <p>Post Count: {user.post_count}</p>
                  <p>Join Date: {new Date(user.join_date).toLocaleDateString()}</p>
              </div>
            ))}
        </div>
      );
}

export default Users;