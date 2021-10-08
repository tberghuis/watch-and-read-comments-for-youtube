
chrome.storage.local.clear()
chrome.storage.local.get(function(result){console.log(result)})










button.ytp-fullscreen-button.ytp-button


var fullbtn = document.querySelector('button.ytp-fullscreen-button.ytp-button');

fullbtn.addEventListener(event, function, useCapture)


yt-fullscreen-change-action


window.addEventListener("fullscreenchange", function(event) {
  console.log("yt-fullscreen-change-action");
  var ytdApp = document.querySelector('ytd-app');
  console.log("fullscreen",ytdApp.fullscreen);
});


var ytdApp = document.querySelector('ytd-app');



ytd-app


yt-visibility-monitor


document.querySelector('yt-visibility-monitor').markDirty();
