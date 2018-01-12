import css from './popup.scss';
console.log(css);
let photo = document.getElementById("photo");
photo.className=css.eye+" "+css.eye__closed;
photo.onclick=function(){
    photo.className=css.eye+" "+css.eye__opened;
}