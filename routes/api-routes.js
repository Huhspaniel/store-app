const path = require('path');
const db = require('../models');

module.exports = function (app) {
    app.get('/api/products', (req, res) => {
        db.Product.findAll()
            .then(data => res.json(data))
            .catch(err => res.json({ error: err }));
    });

    app.post('/api/products', (req, res) => {
        if (req.header('Signature') === process.env.API_KEY) {
            db.Product.create(req.body)
                .then(data => res.json(data))
                .catch(err => res.json({ error: err }));
        } else {
            res.status(401).send('401 Unauthorized');
        }
    });
}