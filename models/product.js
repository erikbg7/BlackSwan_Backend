'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Crear esquema producto
const ProductSchema = Schema({
    name: String,
    picture: String,
    price: { type: Number, default:0 },
    // Especificar que es de tipo String y solo puede ser una de estas tres
    category: {type: String, enum: ['computers', 'phones', 'accessories']},
    description: String
})

module.exports = mongoose.model('Product', ProductSchema)