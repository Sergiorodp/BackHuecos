const expressJwt = require('express-jwt')
const unless = require('../helpers/unless')

async function isRevoked ( req, payload, done) {
    //payload -> contiene los atributos encriptados de jwt.sign

    console.log(payload)

    if(!payload.isAdmin) done(null,true) // revoke the token
    else done() // No revoke the token  
}

const authJwt = () => {
    const secret = process.env.SecretSign
    return expressJwt({
        secret,
        algorithms : ['HS256'],
        isRevoked : isRevoked
    })
    .unless( unless )
}

async function isRevokedClient ( req, payload, done) {
    //payload -> contiene los atributos encriptados de jwt.sign
    if(payload.isAdmin) done(null,true) // revoke the token
    else done(null ,true) // No revoke the token  
}

const clientAuthJwt = () =>{

    const secret = process.env.SecretSign
    return expressJwt({
        secret,
        algorithms : ['HS256'],
        isRevoked : isRevokedClient
    })
    .unless( unless )

}

module.exports = authJwt