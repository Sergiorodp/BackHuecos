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
            return res.writeHead( 301, { Location : `http://localhost:3001/api/v1/products`}).end()
            break       
        default :
            res.status(500).end()
            break

    }
}