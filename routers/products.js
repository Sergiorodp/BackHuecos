const { Router } = require('express')
const multer = require('multer')
const Category = require('../modules/category')
const Product = require('../modules/product')
const router = Router()

const storage = require('../multer/config')
const upload = multer({storage : storage})


router.get(`/`, (req , res, next) => {

    // /products?aval=true
    const { category, count } = req.query
    const limit = count ? Number(count) : 0
    const filter = category ? { category : category.split(',') } : {}

    const products = Product.find( filter )
    .limit(limit)
    .then(result => {
        res.status(200).json(result)
    }).catch( next )

})

router.post(`/`, upload.single('image'), async (req,res,next) => {

    const newProd = req.body
    const reqImage = req.file

    const pathImg = `${req.protocol}://${req.hostname}/uploads`

    const categoryFound = await Category.findById(newProd.category)

    if(!reqImage) return res.status(400).json({
        result : 'No Image Found',
        success : false
    })
    
    if(!categoryFound) return res.status(400).json({
        result : 'No Category Found',
        success : false
    })

    console.log(reqImage)

    const newProduct = new Product({
        name : newProd.name,
        description : newProd.description,
        rishDescription : newProd.rishDescription,
        price : newProd.price,
        image : `${pathImg}/${reqImage.filename}`,
        aval : newProd.aval,
        countInStock : newProd.countInStock,
        category : newProd.category
    })

    newProduct.save()
    .then(createdProduct => {
        res.status(201).json({ result : createdProduct,
        success : true
        })
    })
    .catch( next )
})

router.get(`/:id`, (req,res,next) => {

    const { id } = req.params
    Product.findById(id)
    .populate('category')
    .then(product => {

        if( product === null) {
            const err = new Error()
            err.name = 'NoFound' 
            next( err ) 
        }else{
            res.status(200).json({ result : product,
            success : true})
        }

    })
    .catch( next )
})

router.delete(`/:id`, (req,res,next) => {
    const { id } = req.params

    Product.findByIdAndRemove(id)
    .then( result => {

        if(result) res.status(200).json({ product : result, success : true })
        else res.status(204).json({ product : 'NoFound', success : false })
        
    }).catch( next )
})

router.put(`/:id`, upload.single('image'), (req, res, next) => {

    const { id } = req.params
    const upadtedProduct = req.body
    const reqImage = req.file
    const pathImg = `${req.protocol}://${req.hostname}/public/uploads`

    if(!reqImage) return res.status(400).json({
        result : 'No Image Found',
        success : false
    })

    const update = {
        name : upadtedProduct.name,
        description : upadtedProduct.description,
        rishDescription : upadtedProduct.rishDescription,
        price : upadtedProduct.price,
        image : `${pathImg}/${reqImage.filename}`,
        aval : upadtedProduct.aval,
        countInStock : upadtedProduct.countInStock,
        category : upadtedProduct.category
    }

    Product.findByIdAndUpdate(id, update, {new : true})
    .then( result => {
        res.status(200).json(result)
    }).catch(next)

})

router.get(`/get/count`, (req,res,next) => {

    Product.estimatedDocumentCount()
    .then(count => {

        res.status(200).json({ 
            result : count,
            success : true})
      
    })
    .catch( next )
})

router.get(`/get/avaliable/:count`, (req,res,next) => {

    const count  = req.params.count ? req.params.count : 0

    Product.find({ aval: true })
    .limit( Number(count) )
    .then(result => {

        res.status(200).json({ 
            result : result,
            success : true})
      
    })
    .catch( next )
})

router.get(`/get/avaliable`, (req,res,next) => {

    Product.find({ aval: true })
    .limit( 30 )
    .then(result => {

        res.status(200).json({ 
            result : result,
            success : true})
      
    })
    .catch( next )
})

router.put(`/gallery-images/:id`, upload.array('images',3), (req, res, next) => {

    const { id } = req.params
    const reqImages = req.files
    const pathImg = `${req.protocol}://${req.hostname}/public/uploads`
    let imgPaths = []

    if(!reqImages) return res.status(400).json({ result : 'no images ', success : false}) 
    else reqImages.map( img => {
        imgPaths.push(`${pathImg}/${img.filename}`)
    })

    const update = {
       images : imgPaths
    }

    Product.findByIdAndUpdate(id, update, {new : true})
    .then( result => {
        res.status(200).json(result)
    }).catch(next)

})

module.exports = router