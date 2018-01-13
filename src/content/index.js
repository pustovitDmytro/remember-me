// eslint-disable-line
// function BROWS = browser;
function getLinks(){
    const array = [];
    const  links = document.getElementsByTagName('a');
    for(let i=0; i<links.length; i++) {
        array.push(links[i]);
    }
    return array;
}

function match({href}){
    const re = /id/g;
    return re.test(href);
}

function stilizy(link){
    link.style.color = 'red';
    link.style.fontSize =20;
}
// console.log('content',BROWS);
console.log('inside content script');
console.log('BROWSER', BROWSER);
const links = getLinks();
links.filter(match).forEach(stilizy);