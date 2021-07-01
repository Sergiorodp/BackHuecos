const initialProducts = [
    {
        name : 'product-test-3-a',
        description : 'product-test-3-a description',
        price : 2000,
        image : 'any-url-test',
        aval : false,
        countInStock: 30,
        category : '60dbc63177735b1d909d8fea',
        dateCreated : Date.now()
    },
    {
        name : 'product-test-1-a',
        description : 'product-test-1-a description',
        price : 5000,
        image : 'any-url-test',
        aval : true,
        countInStock: 10,
        category : '60dbc63177735b1d909d8fea',
        dateCreated : Date.now()
    }
]

module.exports = {initialProducts}