const { Router } = require('express')
const Order = require('../modules/order')
const OrderItem = require('../modules/orderItem')

const router = Router()

router.get(`/`, (req, res, next) =>{

    const Orders = Order.find({})
    .populate('user','name')
    .sort({'dateOrder' : -1}) // organizar del más nuevo al más viejo
    .then(result => {
        res.status(200).json(result)
        // mongoose.connection.close() // siempre cerrar la base de datos cuando termie una opreación
    })
    .catch( next )

})

router.get(`/:id`, (req, res, next) =>{

    const { id } = req.params

    const populateProduct = {
                            path : 'OrderItems', 
                            populate : {
                                path : 'product',
                                populate: 'category'
                            }}

    const Orders = Order.findById(id)
    .populate('user','name')
    .populate(populateProduct) // encontrar todos los path dentro del arreglo de orderItems
    .sort({'dateOrder' : -1}) // organizar del más nuevo al más viejo
    .then(result => {

        result ? 
            res.status(200).json({
                result : result,
                success : true}) 
            : 
            res.status(404).json({
                result : 'No Found',
                success : false })

    })
    .catch( next )

})

router.post(`/`, (req,res,next) => {

    const newOrder = req.body

    // save the order items in the DB
    const orderItemsIds = Promise.all(newOrder.OrderItems.map( oi => {

        const newOI = new OrderItem({
            quantity : oi.quantity,
            product : oi.product
        })

        return newOI.save()
        .then( created => {
           return created._id
        }).catch(next)

    }))

    // ********* calculate the total price **********//

    orderItemsIds
    .then( OIarray => {

        // make an array of prices from the products in the order item
        const totalPrice = Promise.all( OIarray.map( oiId => {

            return OrderItem.findById(oiId)
            .populate('product','price')
            .then(  oi => {
                return oi.product.price * oi.quantity 
            }).catch( next )

        }) )

        // return the new Order with the total real price

        return totalPrice
        .then( priceArray => {

            const total = priceArray.reduce( (a,b) => a + b ,0)

            return new Order({
                OrderItems : OIarray,
                shippingAdress1 : newOrder.shippingAdress1,
                shippingAdress2 : newOrder.shippingAdress2,
                city : newOrder.city,
                zip : newOrder.zip,
                phone : newOrder.phone,
                status : newOrder.status,
                totalPrice : total,
                user : newOrder.user
            })

        }).catch( next )

    })
    .then( newOrderFile => { // save the file 

        return newOrderFile.save()
        .then(createdOrder => {
            res.status(201).json({ 
                result : createdOrder,
                success : true
            })
        })
        .catch( next )

    }).catch( next )

})

router.put('/:id', (req,res,next) => {

    const newOrder = req.body
    const { id } = req.params

    const updatedOrder = {
        status: newOrder.status
    }

    Order.findByIdAndUpdate( id, updatedOrder, { new: true })
    // { new: true } es para mostrar el resultado de la actualización
    .then( result => {
        res.status(200).json({
            result : result,
            sucess : true
        })
    }).catch( next )

})

router.delete('/:id', (req,res,next) => {

    const newOrder = req.body
    const { id } = req.params

    const updatedOrder = {
        status: newOrder.status
    }

    Order.findByIdAndRemove(id)
    .then( result => {

        if(result){
            // delete the order items in the order
            result.OrderItems.map( id => {
                OrderItem.findByIdAndDelete(id)
                .catch( next )
            } )

            res.status(200).json({ result : result, success : true })
        }
        else res.status(204).json({ result : 'No Found', success : false })
        
    }).catch( next )

})

/* EXTRA OPTIONS */

router.get('/get/totalsales' , (req, res, next) => {
    Order.aggregate([
        { $group : { _id : null , totalSales : { $sum : '$totalPrice'} } }
    ])
    .then( totalSales => {
        return totalSales ? 
            res.status(200).json({
                result : totalSales[0].totalSales,
                sucess : true
                })
            :
            res.status(400).json({
                result : 'No total Sales',
                sucess : false
                })
    }).catch( next )
})


router.get(`/get/userorders/:id`, (req, res, next) =>{

    const { id } = req.params

    const Orders = Order.find({ user : id })
    .populate({
        path : 'OrderItems', populate :{
            path : 'product', populate : 'category'
        }
    })
    .sort({'dateOrder' : -1}) // organizar del más nuevo al más viejo
    .then(result => {
        res.status(200).json(result)
    })
    .catch( next )

})
module.exports = router