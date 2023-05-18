import { $authHost, $host } from "./index";

export const createBasketDevice = async(basketDevice) => {
    const {data} = await $authHost.post('api/basket-plants', basketDevice)
    return data
}

export const fetchBasketDevices = async(basketId) => {
    const {data} = await $authHost.get('api/basket-plants', {params: {
        basketId
    }})
    return data
}

export const deleteBasketDevices = async(deviceId, basketId) => {
    const {data} = await $authHost.delete('api/basket-plants', {params: {
        deviceId, basketId
    }})
    return data
}

export const putBasketDevices = async(deviceId, basketId) => {
    const {data} = await $authHost.put('api/basket-plants', {params: {
        deviceId, basketId
    }})
    return data
}