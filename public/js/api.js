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