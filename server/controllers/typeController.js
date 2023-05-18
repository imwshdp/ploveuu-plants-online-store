const {Type} = require('../models/models')
const ApiError = require('../error/ApiError')
const { types } = require('pg')

class TypeController {
    async create(req, res) {
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res) {
        const types = await Type.findAll() // находим все типы
        return res.json(types) // выводим все типы
    }
}

module.exports = new TypeController()