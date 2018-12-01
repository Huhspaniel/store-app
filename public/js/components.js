const Sku = props => (
    `<div class=product key=${props.id}>
        <h2>${props.name || props.product.name}</h2>
        <h2>$${props.price || props.product.price}</h2>
        <img src="${props.img_url || props.product.img_url}" alt="product image"/>
    </div>`
)

const AttributeSelect = props => (
    `<select name="${props.id}" key="${props.id}" value="${props.selected_value}">
        <option value="" disabled selected>Select ${props.name}</option>
        ${props.product_attribute_values.map(value => (
            `<option value="${value.id}" key="${value.id}" 
            ${value.value === props.selected_value ? 'selected' : ''}>${value.value}</option>`
        )).join('')}
    </select>`
)