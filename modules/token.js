
const { model, Schema } = require('mongoose')

const tokenSchema = Schema({
    token:{
        type : Number,
        required : true
    },
    isValid: {
        type : Boolean,
        required : true
    },
    fechaCreacion: {
        type : Date,
        default : Date.now
    },
    usuario: {
        type : Schema.Types.ObjectId,
        ref: 'users',
        require : true
    }
})

tokenSchema.set('toJSON',{ 
    transform : (document, returnedObject) => {
            returnedObject.id = returnedObject._id
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

const Token = model('token', tokenSchema)
module.exports = Token