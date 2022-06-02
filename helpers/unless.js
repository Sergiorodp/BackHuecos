const api = process.env.API_URL 

const admin = {
    path : [
        {url : /\/DetectorHuecos\/v1\/deteccion(.*)/ , methods: ['GET','POST','DELETE','OPTIONS'] },
        {url : /\/DetectorHuecos\/v1\/hueco(.*)/ , methods: ['GET','OPTIONS'] },
        {url : /\/DetectorHuecos\/v1\/users\/get(.*)/ , methods: ['GET','OPTIONS'] },
        {url : /\/socket.io(.*)/, methods : ['GET','OPTIONS']},
        `${api}/users/login`,
        `${api}/users/register`,
        `${api}/users/isValidToken`,
        `/`
    ]

}

module.exports = { admin } 

