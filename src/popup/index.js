import css from './popup.scss';
console.log(css);
let photo = document.getElementById("photo");
console.log('in popup');
photo.className=css.eye+" "+css.eye__closed;
photo.onclick=function(){
    console.log('clicked in popup');
    console.log(BROWSER);
    console.log(window.location.href);
    chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {

     // since only one tab should be active and in the current window at once
     // the return variable should only have one entry
     var activeTab = arrayOfTabs[0];
     console.log("activeTab", activeTab.url);
    });
    chrome.storage.sync.get('value', function (obj) {
    console.log(obj);
    });
    photo.className=css.eye+" "+css.eye__opened;
}