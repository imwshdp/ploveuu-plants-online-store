import {makeAutoObservable} from 'mobx';

export default class BasketStore {
    constructor() {
        this._basket_devices = [
            //{id: 1, basketId: 1, deviceId: 1, quantity: 1},
            //{id: 2, basketId: 1, deviceId: 2, quantity: 3},
        ]

        this._baskets = {}
        //{id: 1, userId: 1}

        makeAutoObservable(this)
    }

    setDevices(basket_devices) {
        this._basket_devices = basket_devices
    }

    setBaskets(baskets) {
        this._baskets = baskets
    }

    get basket_devices() {
        return this._basket_devices
    }

    get baskets() {
        return this._baskets
    }
}