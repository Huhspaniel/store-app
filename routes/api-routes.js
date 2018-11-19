const db = require('../models');
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

    products.findAll(null, [db.department, db.producer]);
    products.findOne('id', [db.department, db.producer]);
    products.create(authenticate);
    products.update('id', authenticate);
    products.delete('id', authenticate);

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