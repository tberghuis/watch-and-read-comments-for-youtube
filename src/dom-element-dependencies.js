
export default new Promise(resolve => {
  let player, watchFlexy;
  const assignDomElements = () => {
    player = document.querySelector("#player.ytd-watch-flexy");
    watchFlexy = document.querySelector("ytd-watch-flexy");
    if (!player || !watchFlexy) {
      setTimeout(assignDomElements, 0);
    } else {
      resolve({ player, watchFlexy });
    }
  };

  document.onreadystatechange = async function() {
    if (document.readyState === "complete") {
      assignDomElements();
    }
  };
});

