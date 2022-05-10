const { model, Schema } = require('mongoose')

const userSchema = Schema({
    name:{
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    passwordHash: {
        type: String,
        required: true
    },
    street : {
        type : String,
        dafault : ''
    },
    city : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
})

userSchema.set('toJSON',{ 
    transform : (document, returnedObject) => {
            returnedObject.id = returnedObject._id
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

const User = model('user', userSchema)
module.exports = User
