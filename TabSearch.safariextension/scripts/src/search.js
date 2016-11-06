var popover = null;
var tabs = [];

safari.application.addEventListener('popover', function(event) {
  console.log("aa");
  popover = this;
  update_tab(event);
  update_list();
  update_size();
}, true);

function update_tab(event) {
  tabs = [];
  if (event.target.identifier !== "search_tab_popover") return;
  for (var i = safari.application.browserWindows.length - 1; i >= 0; i--) {
    var win = safari.application.browserWindows[i];
    for (var j = win.tabs.length - 1; j >= 0; j--) {
      tabs.push(win.tabs[j]);
    }
  }
}
function update_list() {
  var table = "";
  for (var i = tabs.length - 1; i >= 0; i--) {
    table += "<li class=\"list-group-item list-group-item-action\" onClick=\"activate_tab('" + i + "')\">" + tabs[i].title + "</li>";
  }
  $('#tab_title').empty();
  $('#tab_title').append(table);
}

function activate_tab(index) {
  var tab = tabs[index];
  tab.browserWindow.activate();
  tab.activate();
  safari.extension.toolbarItems[0].popover.hide();
}

function update_size() {
  safari.extension.popovers[0].height = $("body").height();
}
