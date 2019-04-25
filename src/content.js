
// console.log('content.js');


// TODO only inject if setting enabled


var s = document.createElement('script');
s.src = chrome.runtime.getURL('inject.js');
// why remove???
// s.onload = function() {
//     this.remove();
// };
(document.head || document.documentElement).appendChild(s);