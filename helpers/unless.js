const api = process.env.API_URL 

module.exports = {
    path : [
        {url : /\/public\/uploads(.*)/ , methods: ['GET','OPTIONS'] },
        {url : /\/api\/v1\/products(.*)/ , methods: ['GET','OPTIONS'] },
        {url : /\/api\/v1\/categories(.*)/ , methods: ['GET','OPTIONS'] },
        `${api}/users/login`,
        `${api}/users/register`
    ]
}