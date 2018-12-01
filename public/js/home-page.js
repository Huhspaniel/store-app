function renderHomePage() {
    toggleHidden('.home-page');
    const productsContainer = document.querySelector('.products')
    getAPI('skus', skus => {
        console.log(skus);
        skus.forEach(sku => {
            productsContainer.innerHTML += (
                `<a href='/product?prod=${sku.product.id}&sku=${sku.id}'>${Sku(sku)}</a>`
            )
        })
    }, console.log);
}