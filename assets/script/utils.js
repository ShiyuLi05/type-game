// Utility Functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
    
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function create(element, parent = document) {
    return parent.createElement(element);
}

export { onEvent, select};