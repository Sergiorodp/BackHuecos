const { model, Schema } = require('mongoose')


const OrderItemSchema = Schema({
    product: {
        type : Schema.Types.ObjectId,
        ref :'Product',
    },
    quantity : { 
        type : Number , 
        required : true
    } 
})

OrderItemSchema.set('toJSON',{ 
    transform : (document, returnedObject) => {
            returnedObject.id = returnedObject._id
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

const OrderItem = model('OrderItem', OrderItemSchema)

module.exports = OrderItem