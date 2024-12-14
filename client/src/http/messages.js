import { $authHost } from ".";

export const get_chat = async(id) => {
    try {
        const {data} = await $authHost.get(`/messages/${id}`);
        return data;
    } catch (e) {
        return null;
    }
}


export const send_message = async (id, content) => {
    try {
        const { data } = await $authHost.post(`/messages/`, {receiverId: id, content});
        return data;
    } catch (e) {
        return null
    }
}


export const edit_message = async (id, content) => {
    try {
        const { data } = await $authHost.patch(`/messages/${id}`, {receiverId: id, content})
        return data;
    } catch (e) {
        return null;
    }
}


export const delete_message = async (id) => {
    try {
        const { data } = await $authHost.delete(`/messages/${id}`);
        return data;
    } catch (error) {
        return null;
    }
}