export const setMetaTag = (selector, attr, value) => {
    let element = document.querySelector(selector);
    if (!element) {
        element = document.createElement('meta');
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(element);
        if (selector.startsWith('meta[name=')) {
            element.setAttribute('name', selector.split('"')[1]);
        } else if (selector.startsWith('meta[property=')) {
            element.setAttribute('property', selector.split('"')[1]);
        }
    }
    element.setAttribute(attr, value);
};

export const setLinkTag = (selector, attr, value) => {
    let element = document.querySelector(selector);
    if (!element) {
        element = document.createElement('link');
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(element);
        element.setAttribute('rel', selector.split('"')[1]);
    }
    element.setAttribute(attr, value);
};