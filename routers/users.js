const { Router } = require('express')
const User = require('../modules/user')
const Token = require('../modules/token')
const bcrypt = require('bcryptjs') // npm install bcryptjs
const jwt = require('jsonwebtoken')

const router = Router()

router.get(`/`, (req, res, next) =>{

    const users = User.find({})
    // .select('name email') // recuperar solo name y email
    .select('-passwordHash') // recuperar info sin el pass
    .then(result => {
        res.status(200).json(result)
    })
    .catch( next )
 
})

router.post('/register', (req,res,next) => {

    const reqUser = req.body
    const newUser = new User({
        name : reqUser.name,
        email :  reqUser.email,
        passwordHash : bcrypt.hashSync( reqUser.password, 3 ),
        street : reqUser.street,
        city : reqUser.city,
        country : reqUser.country
    })

    newUser.save()
    .then(result => {
        res.status(201).json(result)
    }).catch(next)

})

router.get('/get/bytkn', (req,res, next) => {

    const { token = '' } = req.query

    console.log(token)

    console.log( jwt.decode(token) )

    const { id = 0 } =  jwt.decode(token) 


    if ( id === 0){
        res.status(404).json({
            result : '',
            success : false
    })
    }

    User.findById( id )
    .select('-passwordHash')
    .then( user => {

        if( user === null) {
            res.status(404).json({
                result : 'No Found',
                success : false
            })
        }else{
            res.status(200).json({ 
                result : {user : user, 
                            token : token} ,
            success : true})
        }

    })
    .catch( next )
})

router.post('/login' , (req,res,next) => {
    const logUser = req.body
    User.findOne({ email : logUser.email })
    .then( result => {

        const comparePass = result && bcrypt.compareSync(logUser.password, result.passwordHash)

        const secret = process.env.SecretSign

        if (comparePass) 
        { 

            const token = jwt.sign({

                isAdmin : result.isAdmin,
                id : result.id,
                fechaCreat : new Date()
                
            },secret,
            {expiresIn : '1d'})

            const newToken = new Token({
                token,
                isValid: true,
                fechaCreacion: new Date(),
                usuario: result.id
            })

            newToken.save()

            result.passwordHash = ''

            res.status(200).json({
            result : {user : result, 
                    token : token},
            success : true}) 
        } 
        else 
        { 
            res.status(400).json({
            result : 'not user or wrong password',
            success : false})
        }

    }).catch(next)
} )

router.get(`/get/count`, (req,res,next) => {

    User.estimatedDocumentCount()
    .then(count => {

        res.status(200).json({ 
            result : count,
            success : true})
      
    })
    .catch( next )
})

router.delete(`/:id`, (req,res,next) => {
    const { id } = req.params

    User.findByIdAndDelete(id)
    .then( result => {

        if(result) res.status(200).json({ User : result, success : true })
        else res.status(204).json({ User : 'No Found', success : false })
        
    }).catch( next )
})

router.get(`/:id`, (req,res,next) => {

    const { id } = req.params
    User.findById(id)
    .select('-passwordHash')
    .then( user=> {

        if( user === null) {
            res.status(404).json({
                result : 'No Found',
                success : false
            })
        }else{
            res.status(200).json({ result : user ,
            success : true})
        }

    })
    .catch( next )
})


module.exports = router