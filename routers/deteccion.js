const { Router } = require('express')
const Deteccion = require('../modules/deteccion')
const Hueco = require('../modules/hueco')
const User = require('../modules/user')
const cloudFiles = require('../cloudinary/clod')

const router = Router()

router.get('/', (req, res, next) =>{
    const detecciones = Deteccion.find({})
    .limit(10)
    .populate('hueco')
    .then(result => {
        res.status(200).json({
            success : true,
            data: result
        })
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
        latitud: deteccion.latitud,
        longitud: deteccion.longitud,
        Image: deteccion.Image,
        usuario: deteccion.usuario
    })

    if(req.files?.image){
        const res = cloudFiles.uploadImage(req.files.image.tempFilePath)
    }

   
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

router.delete('/:id',async (req, res, next) => {
    
    const { id } = req.params

    try{

        const deteccion = await Deteccion.findById(id)
        const deletHueco = await Hueco.findByIdAndDelete(deteccion.hueco)
        const deleteDeteccion = await Deteccion.findByIdAndDelete(id)

        if( !deleteDeteccion || !deletHueco){

            res.status(404).json({
                success:false,
                data:[]
            })
        }else{
            res.status(200).json({
                success:true,
                data:[{
                    hueco : deletHueco,
                    deteccion : deleteDeteccion
                }]
            })
        }

    }catch( e ){
        next
    }
    
})

module.exports = router