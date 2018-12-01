function renderProductPage(query) {
    toggleHidden('.product-page');

    const ProductInfo = ({ product, sku }) => (
        `<h2>${sku.name || product.name}</h2>
        <h3>$${sku.price || product.price}</h3>
    <img src="${sku.img_url || product.img_url}" alt=""/>`
    )

    let product;
    let sku;

    function render() {
        document.querySelector('.product-info').innerHTML = Sku(sku);
        document.querySelector('.product-attributes').innerHTML = (console.log(product) ||
            product.product_attributes.map(attr => {
                const variant = sku.product_variants.find(
                    ({ product_attribute }) => product_attribute.name === attr.name
                );
                attr.selected_value = variant ? variant.product_attribute_value.value : variant;
                return AttributeSelect(attr);
            }).join('')
        );
    }
    function getSelectedAttributes() {
        return Array.from(document.querySelector('.product-attributes').children).map(select => {
            return {
                attribute_id: select.name,
                value_id: select.value
            }
        })
    }
    document.querySelector('.product-attributes').addEventListener('change', e => {
        e.preventDefault();
        const selectedAttributes = getSelectedAttributes();
        let selectedSku = product.skus.find(sku => {
            return (sku.product_variants.every(variant => {
                return selectedAttributes.find(({ attribute_id, value_id }) => {
                    return (attribute_id == variant.attribute_id) && (value_id == variant.value_id);
                });
            }));
        });
        if (!selectedSku) {
            selectedSku = product.skus.find(sku => {
                return sku.product_variants.find(({ attribute_id, value_id }) => {
                    return (e.target.name == attribute_id) && (e.target.value == value_id)
                })
            })
        }
        window.location.search = `?prod=${product.id}&sku=${selectedSku.id}`;
    })

    getAPI(`products/${query.prod}`, data => {
        if (!data.error) product = data
        getAPI(`skus/${query.sku}`, data => {
            if (!data.error) sku = data;
            render();
        })
    })
}