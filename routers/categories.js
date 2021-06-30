const { Router } = require('express')
const Category = require('../modules/category')

const router = Router()

router.get(`/`, (req, res , next) =>{

    const categories = Category.find({})
    .then(result => {
        res.status(200).json(result)
    })
    .catch( next )

})

router.get('/:id' , (req,res,next) => {
    const { id } = req.params
    Category.findById(id)
    .then( result => {

        if(result) res.status(200)
        .json( { result : result,
                success : true})
        else res.status(404).json({
            result : 'NoFound',
            success : false
        })
        
    }).catch(next)
})

router.post('/' , (req,res,next) => {

    const newCategory = req.body

    const buildNewCategory = new Category({
        name :  newCategory.name,
        icon : newCategory.icon,
        color : newCategory.color
    })

    buildNewCategory.save()
    .then( result => {
        res.status(200).json(result)
    })
    .catch(next)
})

router.delete('/:id' , (req,res,next) => {
    const { id } = req.params
    Category.findByIdAndRemove(id)
    .then( result => {

        if(result) res.status(204).json({ result : result, success : true })
        else res.status(404).json({ result : 'NoFound', success : false })
        
    })
    .catch(next)
})

router.put('/:id', (req,res,next) => {
    const newCat = req.body
    const { id } = req.params

    const updatedCat = {
        name : newCat.name,
        icon : newCat.icon,
        color: newCat.color
    }

    Category.findByIdAndUpdate( id, updatedCat, { new: true })
    // { new: true } es para mostrar el resultado de la actualización
    .then( result => {
        res.status(200).json({
            result : result,
            sucess : true
        })
    }).catch( next )
})

module.exports = router