'use strict'

const services = require('../services')


function isAuth (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tienes autorización'})
    }

    /*Split convierte toda la cabezera en un array con tantos 
    elementos como espacios hay = el segundo elemento contiene el token*/
    const token = req.headers.authorization.split(" ")[1]
    
   services.decodeToken(token)
   .then(response => {
       req.user = response
       next()
   })
   .catch(response => {
       res.status(response.status)
   })
}

//Exportar función
module.exports = isAuth