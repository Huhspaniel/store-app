const db = require('../db');
const RestfulAPI = require('./ResfulAPI');

const authenticate = function (req, res, next) {
    if (req.header('API_KEY') === process.env.API_KEY) {
        next();
    } else {
        res.status(401).send('401 Unauthorized');
    }
}

module.exports = function (app) {
    const products = new RestfulAPI('products', db.product, app);
    const producers = new RestfulAPI('producers', db.producer, app);
    const departments = new RestfulAPI('departments', db.department, app);
    const skus = new RestfulAPI('skus', db.sku, app);

    const productVariant = {
        model: db.product_variant,
        include: [db.product_attribute, db.product_attribute_value]
    };

    const productAssociations = [
        db.department,
        db.producer,
        {
            model: db.sku,
            include: [productVariant]
        },
        {
            model: db.product_attribute,
            include: [db.product_attribute_value]
        }
    ];

    const skuAssociations = [
        {
            model: db.product,
            include: [db.department, db.producer]
        },
        productVariant
    ]

    products.findAll(null, productAssociations);
    products.findOne('id', productAssociations);
    products.create(authenticate);
    products.update('id', authenticate);
    products.delete('id', authenticate);

    skus.findAll(null, skuAssociations);
    skus.findOne('id', skuAssociations);
    skus.create(authenticate);
    skus.update('id', authenticate);
    skus.delete('id', authenticate);

    departments.findAll(null, [db.product]);
    departments.findOne('name', [db.product]);
    departments.create(authenticate);
    departments.update('name', authenticate);
    departments.delete('name', authenticate);

    producers.findAll(null, [db.product]);
    producers.findOne('name', [db.product]);
    producers.create(authenticate);
    producers.update('name', authenticate);
    producers.delete('name', authenticate);
}