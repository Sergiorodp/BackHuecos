const { model, Schema } = require('mongoose')


const orderSchema = Schema({
    OrderItems : [{
        type : Schema.Types.ObjectId,
        ref :'OrderItem',
        required : true
    }],
    shippingAdress1 :{
        type : String,
        required : true
    },
    shippingAdress2 : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    zip : {
        type : String,
        default : ''
    },
    phone : {
        type : String,
        required : true
    },
    status : {
      type : String,
      required : true,
      default : 'Pending'  
    },
    totalPrice : {
        type : Number,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref :'User',
        required : true
    },
    dateOrder : {
        type : Date,
        default : Date.now
    }
})

orderSchema.set('toJSON',{ 
    transform : (document, returnedObject) => {
            returnedObject.id = returnedObject._id
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

const Order = model('Order', orderSchema)
module.exports = Order