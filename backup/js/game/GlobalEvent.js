var GlobalEvent = function(){}

GlobalEvent.createEvent = function(name = "notset", args = {}){
  var event = new CustomEvent(name, args);
  window.dispatchEvent(event);
}

GlobalEvent.swapMap = function(entity){
  GlobalEvent.createEvent("swapMap", {detail: {map:entity}});
}

GlobalEvent.swapCamera = function(entity){
  GlobalEvent.createEvent("swapCamera", {detail: {camera:entity}});
}

GlobalEvent.swapCameraFocus = function(entity){
  GlobalEvent.createEvent("swapCameraFocus", {detail: {entity:entity}});
}

GlobalEvent.swapAnimation = function(eid, animName){
  GlobalEvent.createEvent("swapAnimation", {detail: {eid:eid, animName:animName}});
}

GlobalEvent.loadScript = function(script, startLine){
  GlobalEvent.createEvent("loadDialogue", {detail: {script:script, startLine:startLine}});
}
