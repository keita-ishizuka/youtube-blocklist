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

  setInterval(addButton, 500);
  setInterval(() => block(fetchList()), 500);

  function addButton() {
    const query = "div.style-scope.ytd-video-renderer > a";
    for (const channelThumbnail of document.querySelectorAll(query)) {
      const channelInfo = channelThumbnail.parentNode;
      if (channelInfo.id !== "channel-info") {
        continue;
      }
      if (channelInfo.querySelectorAll("button").length === 0) {
        const channelName = channelThumbnail.href.split("@").pop();
        const blockButton = document.createElement("button");
        blockButton.innerText = "block";
        blockButton.style.marginLeft = "0.7em";
        blockButton.addEventListener("click", () => appendToList(channelName));
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

  function fetchList() {
    const channelList = localStorage.getItem(DB_NAME);
    if (channelList === null) {
      return [];
    } else {
      return channelList.split(",");
    }
  }

  function appendToList(channel) {
    const channelList = new Set(fetchList());
    channelList.add(channel);
    localStorage.setItem(DB_NAME, [...channelList].join(","));
  }
})();
