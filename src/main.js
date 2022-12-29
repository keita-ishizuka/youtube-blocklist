// ==UserScript==
// @name         youtube-blocklist
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       zukash, keita-ishizuka
// @match        https://www.youtube.com/*
// @icon
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  setInterval(addButton, 500);

  function test() {
    alert("abc");
  }

  function addButton() {
    const query =
      "div.style-scope.ytd-video-renderer:not(.metadata-snippet-container) > a";
    for (const channelThumbnail of document.querySelectorAll(query)) {
      const channelInfo = channelThumbnail.parentNode;
      if (channelInfo.querySelectorAll("button").length === 0) {
        const channelName = channelThumbnail.href;
        const blockButton = document.createElement("button");
        blockButton.innerText = "block";
        blockButton.addEventListener("click", test);
        channelInfo.appendChild(blockButton);
      }
    }
  }

  function block(blockChannelList) {
    for (const blockChannel of blockChannelList) {
      const query = `a[href="/@${blockChannel}"]`;
      for (const blockVideo of document.querySelectorAll(query)) {
        const target = blockVideo.parentElement.parentElement.parentElement;
        if (target.id == "dismissible") {
          target.remove();
        }
      }
    }
  }
})();
