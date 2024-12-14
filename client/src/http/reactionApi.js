import { $authHost, $host } from ".";


export const send_post_like = async (id) => {
    try {
        const {data} = $authHost.post(`/reactions/send_post_like/${id}`);
        return data;
    } catch (e) {
        return null;
    }
}

export const send_post_dislike = async (id) => {
    try {
        const {data} = $authHost.post(`/reactions/send_post_dislike/${id}`);
        return data;
    } catch (e) {
        return null;
    }
}

export const send_poll_like = async (id) => {
    try {
        const {data} = $authHost.post(`/reactions/send_poll_like/${id}`);
        return data;
    } catch (e) {
        return null;
    }
}

export const send_poll_dislike = async (id) => {
    try {
        const {data} = $authHost.post(`/reactions/send_poll_dislike/${id}`);
        return data;
    } catch (e) {
        return null;
    }
}