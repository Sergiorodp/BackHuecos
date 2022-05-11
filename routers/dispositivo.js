const { Router } = require('express')
const Dispositivo = require('../modules/dispositivos')

const dispositivo = Router()

dispositivo.get('/', (req, res, next) => {

    const dispositivo = Dispositivo.find({})
    // .select('name email') // recuperar solo name y email
    .limit(10) // recuperar info sin el pass
    .then(result => {
        res.status(200).json(result)
    })
    .catch( next )

})

dispositivo.get('/:id', (req, res, next) => {

    const { id } = req.params

    const dispositivo = Dispositivo.findById(id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch( next )

})

dispositivo.post('/', async (req, res, next) => {

    const deteccion = req.body

    const userFound = await User.findById(deteccion.usuario)

    if(!userFound){
        res.json({
            status : 404,
            success : false,
            message : 'User No Found'
        })
    }

    const newDispositivo = new Dispositivo({
        latitud: hueco.latitud,
        longitud: hueco.longitud,
        Image: hueco.Image,
        usuario: deteccion.usuario
    })

   
    newDispositivo.save()
    .then( dispositivo => {
        console.log(dispositivo)
    })
    .catch( next )

})

module.exports = dispositivo