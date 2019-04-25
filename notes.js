

// css
// #player.ytd-watch-flexy {width: `from computed vue` }
// #player-container-outer.ytd-watch-flexy { min-width: 0 }


document.querySelector(
  "ytd-watch-flexy"
).calculateCurrentPlayerSize_ = function() {
  var width = document.querySelector("#player.ytd-watch-flexy").clientWidth;
  var ratio = document.querySelector("ytd-watch-flexy")
    .videoHeightToWidthRatio_;
  return { width, height: width * ratio };
};


// on resize bar drag release
$('ytd-watch-flexy').schedulePlayerSizeUpdate_()



