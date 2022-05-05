const { model, Schema } = require('mongoose')

const deteccionSchema = Schema({
    velocidad:{
        type : Number,
        required : true
    },
    aceleracion: {
        type : Number,
        required : true
    },
    fechaCreacion: {
        type: Date,
        default : Date.now
    },
    usuario: {
        type : Schema.Types.ObjectId,
        ref: 'users',
        require : true
    },
    hueco: {
        type : Schema.Types.ObjectId,
        ref : 'hueco',
        require : true
    },
    tipoDetect : {
        typeof: Number,
        require: true
    }
})

deteccionSchema.set('toJSON',{ 
    transform : (document, returnedObject) => {
            returnedObject.id = returnedObject._id
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

const User = model('User', deteccionSchema)
module.exports = User