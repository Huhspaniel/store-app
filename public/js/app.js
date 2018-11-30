function toggleHidden(selector) {
    document.querySelector(selector).classList.toggle('hidden');
}
switch (window.location.pathname) {
    case '/': {
        renderHomePage();
        break;
    }
    case '/product': {
        const urlParams = new URLSearchParams(window.location.search);
        const query = {
            prod: urlParams.get('prod'),
            sku: urlParams.get('sku')
        };
        if (query.prod && query.sku) {
            renderProductPage(query);
            break;
        }
    }
    default: {
        toggleHidden('#notfound');
        console.log(window.location.pathname);
    }
}