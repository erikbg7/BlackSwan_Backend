'user strict'

const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {

  console.log('signup ', req.body);

    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })  

    user.save((err) => {
        if (err) return res.status(500).send({ message: `Error al crear usuario: ${err}`})
    
        //createToken recibe el objeto user
        return res.status(200).send({ token: service.createToken(user) })
    })
}

function signIn (req, res) {

   // console.log('request ', req);

  User.find({ email: req.body.email }, (err, user) => {
    console.log(!user)
    console.log(user)
    if (err) return res.status(500).send ({ message: err})
    if (user.length === 0) return res.status(404).send({ message: 'User does not exist'})


    console.log('user ddbb', user);

    res.user = user;
    console.log('pass-> ', user[0].password);
    if(user[0].password === req.body.password) {
      res.status(200).send({
        message: 'Te has logueado correctamente',
        token: service.createToken(user)
      })
    }
    else {
        res.status(402).send({message: 'Incorrect password'})
    }
  })
}

function getUsers (req, res) {
    User.find({}, (err, users) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err} `})
        if (!users) return res.status(404).send({message: 'No existen productos'})
       
        res.status(200).send(users)
    })
}

function getUser (req,res) {
    let userId = req.params.userId
    
    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err} `})
        if (!user) return res.status(404).send({message: `El user no existe`})
  
        res.status(200).send(user)
    })
}


function saveUser (req, res) {
  console.log('POST /api/user')
  console.log(req.body) //Mostrar todo el cuerpo (body)

  let user = new User()
  user.email= req.body.email,
    user.displayName= req.body.displayName,
    user.password = req.body.password

  user.save((err, userStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la BBDD: ${err}`})

    res.status(200).send({user: userStored})
  })
}


function deleteUser (req,res)  {
    let userId = req.params.userId

    User.findById(userId, (err, user) => {
        if (err) res.status(500).send({message: `Error al eliminarlo: ${err}`})
    
        user.remove(err => {
            if (err) res.status(500).send({message: `Error al eliminarlo: ${err}`})
            
            res.status(200).send({message: `user eliminado`})
        })
    })
}

module.exports = {
    signUp,
    saveUser,
    getUsers,
    getUser,
    deleteUser,
    signIn
}




 	