import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";

export const login = async(login, password) => {
    const { data } = await $host.post('users/login', {
        login, password
    });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}


export const register = async(login, password) => {
    const { data } = await $host.post('users/register', {
        login, password
    });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}


export const check = async() => {
    try{
        const { data } = await $authHost.get('users/profile');
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    }
    catch(err){
        return null;
    }
}