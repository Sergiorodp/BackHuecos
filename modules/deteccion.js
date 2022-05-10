const { model, Schema } = require('mongoose')

const DeteccionSchema = Schema({
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
        required : true
    },
    hueco: {
        type : Schema.Types.ObjectId,
        ref : 'hueco',
        required : true
    },
    tipoDetect : {
        type: Number,
        required: true
    }
})

DeteccionSchema.set('toJSON',{ 
    transform : (document, returnedObject) => {
            returnedObject.id = returnedObject._id
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

const Deteccion = model('deteccion', DeteccionSchema)
module.exports = Deteccion