require('dotenv/config') // npm install dotenv

const api = process.env.API_URL // get enviroment variables

module.exports = (error, req, res, next) => {

    console.error(error)
    console.log(error.name)

    switch( error.name ){

        case 'CastError':
            res.status(400).json({
                error: ' id use is malformed'
            })
            break
        case 'NoFound' :
            res.status(404).json({
                error: error.message
            })
            break
        case 'UnauthorizedError' : 
            // res.writeHead( 301, { Location : `https://detector-huecos.herokuapp.com${api}/hueco`}).end()
            res.status(401).json({
                succees : false,
                message: error.message
            })
            break       
        default :
            res.status(500).end()
            break

    }
}