function callOnClickWithFacetime(info, tab) {
    var rawNumber = info.selectionText;
    var telNumber = '';
    var trimPrefix = false;
    for (var i = 0; i < rawNumber.length; i++) {
      var char = rawNumber[i];
      if(!isNaN(char) && char != ' ') {
          if(telNumber.length == 10) {
              if(telNumber[0] == '1' && !trimPrefix) {
                  telNumber = telNumber.substring(1);
                  trimPrefix = true;
              } else {
                  alert(rawNumber + " is not a valid telephone number.");
                  return;
              }  
          }

          telNumber += char; 
      }
    }

    if(telNumber.length != 10) {
        alert(rawNumber + " is not a valid telephone number.");
        return;
    }

    console.log("number: " + telNumber);
    chrome.tabs.create({"url": "tel://" + telNumber, "active": false},
                        function(tab) {
                            setTimeout(function(){ 
                              chrome.tabs.remove(tab.id);
                              console.log(tab.id + " - " + tab.title + ": is closed");
                            }, 1000);  
                        });
}

function callOnClickWithHangouts(info, tab) {
    var rawNumber = info.selectionText;
    var telNumber = '';
    var trimPrefix = false;
    for (var i = 0; i < rawNumber.length; i++) {
      var char = rawNumber[i];
      if(!isNaN(char) && char != ' ') {
          if(telNumber.length == 10) {
              if(telNumber[0] == '1' && !trimPrefix) {
                  telNumber = telNumber.substring(1);
                  trimPrefix = true;
              } else {
                  alert(rawNumber + " is not a valid telephone number.");
                  return;
              }  
          }

          telNumber += char; 
      }
    }

    if(telNumber.length != 10) {
        alert(rawNumber + " is not a valid telephone number.");
        return;
    }

    console.log("number: " + telNumber);
    chrome.tabs.create({"url": "https://hangouts.google.com/?action=chat&pn=" + telNumber, "active": true})
}
  
var callMenu = chrome.contextMenus.create({
    "title": "Call: %s",
    "contexts": ["selection"]});

var facetimeMenu = chrome.contextMenus.create(
  {"title": "over Facetime", "contexts": ["selection"], "parentId": callMenu, "onclick": callOnClickWithFacetime});

var hangoutsMenu = chrome.contextMenus.create(
  {"title": "over Hangouts", "contexts": ["selection"], "parentId": callMenu, "onclick": callOnClickWithHangouts});
console.log("parent:" + callMenu + " child1:" + facetimeMenu + " child2:" + hangoutsMenu);