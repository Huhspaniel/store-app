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
    function createProduct(product, variants) {
        const passedAttributes = variants.reduce((attributes, variant, i) => {
            attributes.push(...Object.entries(variant.attributes).map(
                attribute => ({ name: attribute[0], value: attribute[1], index: i })
            ));
            return attributes;
        }, []);
        return findDepartmentId(product.department)
            .then(department_id => {
                product.department_id = product.department_id || department_id;
                return db.product.create(product)
            }).then(db_product => {
                product.id = db_product.id;
                if (product.producer_ids) return addProducers(product.id, product.producer_ids)
            }).then(() => bulkCreateSkus(variants, product.id))
            .then(skus => {
                return db.product_attribute.bulkCreate(
                    passedAttributes.map(({ name }) => ({ name: name, product_id: product.id }))
                        .filter(({ name: currName }, i, arr) => {
                            return arr.findIndex(({ name }) => name === currName) === i
                        })
                ).then(attributes => {
                    return db.product_attribute_value.bulkCreate(
                        attributes.reduce((values, { id, name: currAttr }, i) => {
                            values.push(
                                ...passedAttributes.filter(({ name }) => name === currAttr)
                                    .map(({ value }) => ({ value: value, attribute_id: id }))
                            )
                            return values;
                        }, [])
                    ).then(values => {
                        return db.product_variant.bulkCreate(
                            variants.reduce((variations, variant, i) => {
                                variations.push(...Object.entries(variant.attributes).map(passedAttr => {
                                    const product_id = product.id;
                                    const sku_id = skus[i].id;
                                    const attribute_id = attributes.find(attr => attr.name === passedAttr[0]).id;
                                    const value_id = values.find(val => {
                                        return val.attribute_id === attribute_id && val.value === passedAttr[1];
                                    }).id;
                                    return {
                                        product_id: product_id,
                                        sku_id: sku_id,
                                        attribute_id: attribute_id,
                                        value_id: value_id
                                    };
                                }))
                                return variations;
                            }, [])
                        )
                    })
                })
            })
    }
    function bulkCreateProducts(products) {
        const productsPromises = products.map(({ product, variants }) => createProduct(product, variants));
        return Promise.all(productsPromises);
    }
}