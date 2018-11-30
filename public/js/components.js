const Sku = props => (
    `<div class=product>
        <h2>${props.name || props.product.name}</h2>
        <h2>$${props.price || props.product.price}</h2>
        <img src="${props.img_url || props.product.img_url}" alt="product image"/>
    </div>`
)