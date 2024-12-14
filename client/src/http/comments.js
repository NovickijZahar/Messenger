import { $authHost } from ".";

export const get_all_comments = async (id) =>{
    try {
        const { data } = await $authHost.get(`/comments/${id}`);
        return data;
    } catch (e) {
        return null;
    }
}


export const send_commnet = async (id, content) => {
    try {
        const { data } = await $authHost.post(`/comments/${id}`, {content})
    } catch (e) {
        return null;
    }
}