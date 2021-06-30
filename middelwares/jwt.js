const expressJwt = require('express-jwt')
const unless = require('../helpers/unless')

async function isRevoked ( req, payload, done) {
    //payload -> contiene los atributos encriptados de jwt.sign
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

module.exports = authJwt