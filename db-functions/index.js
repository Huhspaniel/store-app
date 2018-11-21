module.exports = function (db) {
    return {
        createProduct: createProduct,
        bulkCreateProducts: bulkCreateProducts
    };
    function createProduct(product, variants) {
        const passedAttributes = variants.reduce((attributes, variant, i) => {
            attributes.push(...Object.entries(variant.attributes).map(
                attribute => ({ name: attribute[0], value: attribute[1], index: i })
            ));
            return attributes;
        }, []);
        return (() => {
            if (product.department && String(product.department).match(/[a-z]/i))
                return db.department.findOne({ where: { name: product.department } })
            else return new Promise(res => res({ id: product.department }));
        })().then(({ id: department_id }) => {
            if (!product.department_id) product.department_id = department_id;
            return db.product.create(product)
        }).then(resProduct => {
            const producer_ids = product.producer_ids;
            product = resProduct;
            if (producer_ids)
                return db.producer.findAll({
                    where: db.Sequelize.or(
                        ...producer_ids.map(producer_id => ({ id: producer_id }))
                    )
                });
        }).then(producers => {
            if (producers) {
                for (let producer of producers) {
                    producer.addProduct(product);
                }
            }
        }).then(() => {
            if (variants) {
                return db.sku.bulkCreate(variants.map(variant => {
                    variant.product_id = product.id;
                    return variant;
                }), { individualHooks: true })
            }
        }).then(skus => {
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
        var promise;
        for (let { product, variants } of products) {
            promise = promise ?
                promise.then(() => createProduct(product, variants)) : createProduct(product, variants);
        }
        return promise ? promise : new Promise(resolve => resolve([]));
    }
}