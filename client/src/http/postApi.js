import { $authHost, $host } from ".";


export const all_posts = async(id) => {
    try{
        const { data } = await $authHost.get(`posts/${id}`);
        return data;
    }
    catch(e){
        return null;
    }
}


export const my_posts = async() => {
    try{
        const { data } = await $authHost.get('posts/my_posts');
        return data;
    }
    catch(e){
        return null;
    }
}

export const create_post = async(content) => {
    try{
        const { data } = await $authHost.post('posts/my_posts', {content});
        return data;
    }
    catch(e){
        return null;
    }
}


export const remove_post = async(id) => {
    try{
        const { data } = await $authHost.delete(`posts/my_posts/${id}`);
        return data;
    }
    catch(e){
        return null;
    }
} 

export const edit_post = async(id, content) => {
    try{
        const { data } = await $authHost.patch(`posts/my_posts/${id}`, {content});
        return data;
    }
    catch(e){
        return null;
    }
}