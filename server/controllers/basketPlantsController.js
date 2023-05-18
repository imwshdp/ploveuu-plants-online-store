const {BasketDevice} = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketPlantsController {
    // CREATE 
    async create(req, res) {
        const {deviceId, basketId} = req.body

        let basketPlant = await BasketDevice.findOne({
            where: {
                deviceId,
                basketId,
            },
        })

        if (basketPlant) { // обновить количество
            await BasketDevice.upsert({
                id: basketPlant.id,
                quantity: basketPlant.quantity + 1,
            })

        } else { // добавить новое растение
            basketPlant = await BasketDevice.create({deviceId, basketId, quantity: 1,}) 
        }

        return res.json(basketPlant)
    }

    // DELETE
    async delete(req, res, next) {
        const { deviceId, basketId } = req.body;

        await BasketDevice.destroy({
            where: {
                deviceId,
                basketId,
            },
        })

        return res.status(204).json()
    }

    // GET 
    async getAll(req, res) {
        const {basketId} = req.query;

        const basketPlants = await BasketDevice.findAll({
            where: {basketId},
            attributes: {exclude: ['createdAt', 'updatedAt']},
        })

        return res.json(basketPlants);
    }

    // INCREASE
    async increase(req, res) {
        const {deviceId, basketId} = req.body;

        let increasedPlant = await BasketDevice.findOne({
            where: {
                deviceId,
                basketId,
            },
        })

        await BasketDevice.upsert({
            id: increasedPlant.id,
            quantity: increasedPlant.quantity + 1,
        })

        increasedPlant = await BasketDevice.findOne({
            where: { deviceId, basketId },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
        })

        return res.json(increasedPlant);
    }

    // DECREASE
    async decrease(req, res) {
    const {deviceId, basketId} = req.body;

    let decreasedPlant = await BasketDevice.findOne({
        where: {
            deviceId,
            basketId,
        }
    })

    // удалить, если количество = 1
    if (decreasedPlant.quantity === 1) {
        decreasedPlant.destroy()
    } else {
        // иначе уменьшить на 1
        decreasedPlant = await BasketDevice.upsert({
            id: decreasedPlant.id,
            quantity: decreasedPlant.quantity - 1,
        })
    }

    decreasedPlant = await BasketDevice.findOne({
        where: {deviceId, basketId},
        attributes: {exclude: ['createdAt', 'updatedAt']},
    })

    return res.json(decreasedPlant);
  }
}

module.exports = new BasketPlantsController()