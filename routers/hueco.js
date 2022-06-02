const { Router } = require('express')
const Deteccion = require('../modules/deteccion')
const Hueco = require('../modules/hueco')
const User = require('../modules/user')

const router = Router()

router.get('/', (req, res, next) => {

    const detecciones = Hueco.find({})
    .select('-usuario')
    .sort({fechaCreacion: -1})
    .then(result => {
        res.status(200).json(result)
    })
    .catch( next )

})

router.get('/count', (req, res, next) => {
    Hueco.find({})
    .count()
    .then(result => {
        res.status(200).json({
            success: true,
            data : result
        })
    })
})

module.exports = router