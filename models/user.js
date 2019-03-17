'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs') //Librería para encriptar la contraseña
const crypto = require('crypto')

//Modelo usuario
const UserSchema = new Schema ({
    email: { type: String, unique:true, lowercase: true},
    displayName: String,
    avatar: String,
    password: { type: String, select: false }, //Para que al hacer un GET no se envíe la contraseña
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
})

//Función que se ejecuta antes de que se salve
UserSchema.pre('save', (next) => {
    let user = this
    //Si el usuario no ha modificado el password = terminar función y pase al siguiente nivel (next)
        //if (!user.isModified('password')) return next()

    //Genera un salt de 10 = num de dígitos aleatorios que se le agrega al hash
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        //Hash cifra la contraseña creando un código
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

//Función Gravatar
UserSchema.methods.gravatar = function () {
    //Si user no tiene email registrado en gravatar, devuelve un gravatar by default
    if (!this.email) return 'http://gravatar.com/avatar/?s=200&d=retro'

    //md5 = tipo de hash que usa gravatar
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)

