import css from './popup.scss';
console.log(css);
let photo = document.getElementById("photo");
console.log('in popup');
photo.className=css.eye+" "+css.eye__closed;
photo.onclick=function(){
    console.log('clicked in popup');
    console.log(BROWSER);
    chrome.storage.sync.get('value', function (obj) {
    console.log(obj);
});
    photo.className=css.eye+" "+css.eye__opened;
}