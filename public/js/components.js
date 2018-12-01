const Sku = props => {
    const goodStock = props.stock > 15;
    return (
        `<div class=product key=${props.id}>
            <div class=product-header>
                <h2>${props.name || props.product.name}</h2>
                <h3 class=price>$${props.price || props.product.price}</h3>
                <h3 class=stock-status style="color:${goodStock ? 'green' : 'red'}">
                    ${goodStock ? 'In Stock' : props.stock ? `Only ${props.stock} left in stock` : 'Out of Stock'}
                </h3>
            </div>
            <img src="${props.img_url || props.product.img_url}" alt="product image"/>
        </div>`
    )
}

const AttributeSelect = props => (
    `<select name="${props.id}" key="${props.id}" value="${props.selected_value}">
        <option value="" disabled selected>Select ${props.name}</option>
        ${props.product_attribute_values.map(value => (
        `<option value="${value.id}" key="${value.id}" 
            ${value.value === props.selected_value ? 'selected' : ''}>${value.value}</option>`
    )).join('')}
    </select>`
)