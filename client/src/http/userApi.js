import { $authHost, $host } from ".";
import { jwtDecode } from "jwt-decode";


export const get_all_users = async() => {
    try {
        const { data } = await $authHost.get('users/');
        return data;
    } catch (e) {
        return null;
    }
}

export const get_profile = async(id) => {
    try{
        const { data } = await $authHost.get(`users/profile/${id}`);
        return data;
    }
    catch (e){
        return null;
    }
}


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
        const { data } = await $authHost.get('users/check');
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    }
    catch(err){
        return null;
    }
}


export const my_profile = async() => {
    try{
        const { data } = await $authHost.get('users/my_profile');
        return data;
    }
    catch(err){
        return null;
    }
}


export const update_profile = async(bio, email, telephone) => {
    try {
        const { data } = await $authHost.patch('/users/profile', {bio, email, telephone})
        return data;
    } catch (e) {
        return null;
    }
}