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

const APP_NAME = "youtube-blocklist";
const DB_NAME = `${APP_NAME}:blockChannelList`;

(function () {
  "use strict";

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

  function fetchList() {
    const channelList = localStorage.getItem(DB_NAME);
    if (channelList === null) {
      return [];
    } else {
      return channelList.split(",");
    }
  }

})();
