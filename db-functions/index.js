Array.prototype.pushIfNotExist = function (passedVal, compare, alt) {
    const index = this.findIndex(val => {
        return compare ? compare(passedVal, val) : passedVal === val;
    });
    if (index < 0) this.push(passedVal);
    else if (alt) alt.bind(this)(index);
}
module.exports = function (db) {
    return {
        createProduct: createProduct,
        bulkCreateProducts: bulkCreateProducts
    };
    function findDepartmentId(department) {
        return new Promise((resolve, reject) => {
            if (department && String(department).match(/[a-z]/i))
                db.department.findOne({ where: { name: department } })
                    .then(({ id }) => resolve(id)).catch(reject);
            else resolve(department)
        })
    }
    function addProducers(product_id, producer_ids) {
        return db.producer.findAll({
            where: db.Sequelize.or(
                ...producer_ids.map(producer_id => ({ id: producer_id }))
            )
        }).then(producers => {
            if (producers) {
                for (let producer of producers) {
                    producer.addProduct(product_id);
                }
            }
        })
    }
    function bulkCreateSkus(skus, product_id) {
        return db.sku.bulkCreate(skus.map(sku => {
            sku.product_id = product_id;
            return sku;
        }), { individualHooks: true })
    }
    function parseSkus(skus) {
        const attributes = skus.reduce((accumulator, sku) => {
            if (sku.attributes) Object.entries(sku.attributes).forEach(([attr, value]) => {
                accumulator.pushIfNotExist(
                    { name: attr, values: [value] },
                    (a, b) => a.name === b.name,
                    function (i) { this[i].values.pushIfNotExist(value) }
                )
            })
            return accumulator;
        }, []);
        const values = attributes.reduce((accumulator, { name: attribute_name, values }, i) => {
            accumulator.push(...values.map(val => ({ value: val, attribute: attribute_name, attribute_index: i })));
            return accumulator;
        }, []);
        const variants = skus.reduce((accumulator, sku, i) => {
            if (sku.attributes) accumulator.push(
                ...Object.entries(sku.attributes)
                    .map(([attr, val]) => ({ sku_index: i, attribute: attr, value: val }))
            )
            return accumulator;
        }, [])
        return {
            attributes: attributes, // [{ name, values[] }]
            values: values, // [{ value, attribute, attribute_index }]
            variants: variants // [{ sku_index, attribute, value }]
        }
    }
    function createProduct(product, skus) {
        const { attributes, values, variants } = parseSkus(skus);
        return findDepartmentId(product.department)
            .then(department_id => {
                product.department_id = product.department_id || department_id;
                return db.product.create(product)
            }).then(db_product => {
                product.id = db_product.id;
                if (product.producer_ids) return addProducers(product.id, product.producer_ids)
            }).then(() => bulkCreateSkus(skus, product.id))
            .then(db_skus => {
                return db.product_attribute.bulkCreate(
                    attributes.map(({ name }) => ({ name: name, product_id: product.id }))
                ).then(db_attributes => {
                    return db.product_attribute_value.bulkCreate(
                        values.map(val => {
                            val.attribute_id = db_attributes[val.attribute_index].id;
                            return val;
                        })
                    ).then(db_values => {
                        return db.product_variant.bulkCreate(
                            variants.map(variant => {
                                const attribute_id = db_attributes.find(
                                    attr => attr.name === variant.attribute
                                ).id;
                                return {
                                    product_id: product.id,
                                    sku_id: db_skus[variant.sku_index].id,
                                    attribute_id: attribute_id,
                                    value_id: db_values.find(
                                        val => val.attribute_id === attribute_id && val.value === variant.value
                                    ).id
                                }
                            })
                        )
                    })
                })
            })
    }
    function bulkCreateProducts(products) {
        const productsPromises = products.map(({ product, skus }) => createProduct(product, skus));
        return Promise.all(productsPromises);
    }
}