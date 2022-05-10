const api = process.env.API_URL 

module.exports = {
    path : [
        {url : /\/public\/uploads(.*)/ , methods: ['GET','OPTIONS'] },
        {url : /\/DetectorHuecos\/v1\/hueco(.*)/ , methods: ['GET','OPTIONS'] },
        {url : /\/DetectorHuecos\/v1\/deteccion(.*)/ , methods: ['POST','OPTIONS'] },
        `${api}/users/login`,
        `${api}/users/register`,
        {url : /\/uploads(.*)/ , methods: ['GET','OPTIONS'] },
        `/`
    ]
}