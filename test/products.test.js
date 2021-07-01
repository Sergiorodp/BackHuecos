const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../app')

const api = supertest(app)

const { initialProducts } = require('./helpers')

// schmas

const Product = require('../modules/product')
 
beforeEach( async () => {
    await Product.deleteMany()

    const pdct1 = new Product(initialProducts[0])
    await pdct1.save()

    const pdct2 = new Product(initialProducts[1])
    await pdct2.save()

})

test('products are returned as json' , async () => {
    await api
    .get('/api/v1/products')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('there are 2 products' , async () => {
    const res = await api.get('/api/v1/products')
    expect(res.body).toHaveLength(initialProducts.length)
})


test('there is product has a name product-test-3-a' , async () => {
    const res = await api.get('/api/v1/products')

    const names = res.body.map(product => product.name)

    expect(names).toContain('product-test-3-a')
})

afterAll( async () => {
    await mongoose.connection.close()
    await server.close()
})

// apuntes

// jest --silent quita los console log de la consola
// -- --watch usa el comando para el jest y no para el npm run 