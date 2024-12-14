import { $authHost } from '.';


export const subscribe = async(id) => {
    try {
        const {data} = await $authHost.post(`/subscription/subscribe/${id}`)
        return data;
    } catch (e) {
        return null;
    }
}


export const desubscribe = async(id) => {
    try {
        const {data} = await $authHost.post(`/subscription/desubscribe/${id}`)
        return data;
    } catch (e) {
        return null;
    }
}


export const check_sub = async(id) => {
    try {
        const {data} = await $authHost.get(`/subscription/check_sub/${id}`)
        return data;
    } catch (e) {
        return null;
    }
}