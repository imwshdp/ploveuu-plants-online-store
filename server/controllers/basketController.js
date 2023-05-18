const {Basket} = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {
    async getOne(req, res) {
        const {userId} = req.query // в гет запросе - парамс
        
        const basket = await Basket.findOne(
            {
                where: {userId},
                attributes: {exclude: ['createdAt', 'updatedAt']},
            },
        )
        return res.json(basket)
    }
}

module.exports = new BasketController()