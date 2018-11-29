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

const Product = props => (
    `<div class=product>
        <h2>${props.name || props.product.name}</h2>
        <h2>$${props.price || props.product.price}</h2>
        <img src="${props.img_url || props.product.img_url}" alt="product image"/>
    </div>`
)

const productsContainer = document.querySelector('.products')
getAPI('skus', products => {
    console.log(products);
    products.forEach(product => {
        productsContainer.innerHTML += (
            Product(product)
        )
    })
}, console.log);