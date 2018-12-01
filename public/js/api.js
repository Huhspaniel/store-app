function ajaxJSON({ type, url, data, success, error }) {
    const xhr = new XMLHttpRequest();
    try {
        xhr.open(type.toUpperCase(), url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => success(JSON.parse(xhr.response));
        xhr.send(JSON.stringify(data));
    } catch (err) {
        if (error) error(err);
        else throw err;
    }
}
function getAPI(resource, success, error) {
    ajaxJSON({
        type: 'GET',
        url: `/api/${resource}`,
        success: success,
        error: error
    })
}
// function parseAttributes(product) {
//     const attributes = product.product_attributes.map(attr => ({
//         id: attr.id,
//         product_id: attr.product_id,
//         name: attr.name,
//         values: attr.product_attribute_values
//     }));
//     return attributes;
// }