function renderProductPage(query) {
    toggleHidden('.product-page');

    const ProductInfo = ({ product, sku }) => (console.log(product) || 
        `<h2>${sku.name || product.name}</h2>
        <h3>$${sku.price || product.price}</h3>
    <img src="${sku.img_url || product.img_url}" alt=""/>`
    )

    let product;
    let sku;

    function render() {
        document.querySelector('.product-info').innerHTML = Sku(sku);
    }

    getAPI(`products/${query.prod}`, data => {
        console.log(data);
        if (!data.error) product = data
        getAPI(`skus/${query.sku}`, data => {
            console.log(data);
            if (!data.error) sku = data;
            render();
        })
    })
}