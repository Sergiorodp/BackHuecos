const { Router } = require('express')
const Deteccion = require('../modules/deteccion')
const Hueco = require('../modules/hueco')
const User = require('../modules/user')

const router = Router()

router.get('/', (req, res, next) =>{
    const detecciones = Deteccion.find({})
    .then(result => {
        res.status(200).json(result)
    })
    .catch( next )
})

router.get('/:id', (req, res, next) => {

    const { id } = req.params
    Deteccion.findById(id)
    .then( deteccion => {

        if( deteccion === null) {
            res.status(404).json({
                result : 'No Found',
                success : false
            })
        }else{
            res.status(200).json({ result : deteccion ,
            success : true})
        }

    })
    .catch( next )

})

router.post(`/`, async (req, res, next) => {

    const deteccion = req.body
    const hueco = deteccion.hueco

    const userFound = await User.findById(deteccion.usuario)

    if(!userFound){
        res.json({
            status : 404,
            success : false,
            message : 'User No Found'
        })
    }

    const newHueco = new Hueco({
        latitud: hueco.latitud,
        longitud: hueco.longitud,
        Image: hueco.Image,
        usuario: deteccion.usuario
    })

   
    newHueco.save()
    .then( hueco => {

        console.log(hueco)

        const newDeteccion = new Deteccion({
            velocidad: deteccion.velocidad,
            aceleracion: deteccion.aceleracion,
            usuario: deteccion.usuario,
            hueco: hueco._id,
            tipoDetect : deteccion.tipoDetect
        })

        newDeteccion.save()
        .then(createdDeteccion => {
            res.status(201).json({ result : createdDeteccion,
            success : true
            })
        })
        .catch( next )
    })

})

module.exports = router