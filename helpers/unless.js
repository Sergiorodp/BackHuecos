const api = process.env.API_URL 

const admin = {
    path : [
        {url : /\/DetectorHuecos\/v1\/deteccion(.*)/ , methods: ['GET','POST','OPTIONS'] },
        {url : /\/DetectorHuecos\/v1\/huecos(.*)/ , methods: ['GET','OPTIONS'] },
        {url : /\/DetectorHuecos\/v1\/users\/get(.*)/ , methods: ['GET','OPTIONS'] },
        `${api}/users/login`,
        `${api}/users/register`,
        `/`
    ]

}



module.exports = { admin } 

