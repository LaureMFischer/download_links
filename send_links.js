// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Send back to the popup a sorted deduped list of valid link URLs on this page.
// The popup injects this script into all frames in the active tab.

var assignmentGroups = [].slice.apply(document.getElementsByClassName("assignments"));
var links = assignmentGroups.map(function(group) {
  // Get the due date of each assignment group
  var dueDate = group.getElementsByTagName('input')[0].value;
  // Grab all links from the assignment group
  var anchors = group.getElementsByClassName("panel-body")[0].getElementsByTagName('a');
  var anchorsArray = [].slice.apply(anchors);
  // Return an object for each link with its due date, href, name and title
  var anchorsWithDates = anchorsArray.map(function(anchor) {
    return {dueDate: dueDate, name: anchor.innerText, href: anchor.href, title: anchor.title};
  });
  return anchorsWithDates;
});

// Make links into just one array of objects representing each link
links = links.reduce(function(a, b) {
  return a.concat(b);
}, []);

chrome.extension.sendRequest(links);
