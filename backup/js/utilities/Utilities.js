var utilities = function(){}

utilities.getRandomInt = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

utilities.convertXYtoIndex = function(x, y, tileW){
  return (x + tileW * y);
}

// Set tileWidth to 1 for "convertIndexToXY"
utilities.indexToSheetPos = function(index, widthInTiles, tileWidth){
  var x = (index % widthInTiles) * tileWidth;
  var y = Math.floor(index / widthInTiles) * tileWidth;

  return {x, y};
}

utilities.checkInArray = function(array, object){
  if(array.indexOf(object) > -1){
    return true;
  }
  else{
    return false;
  }
}

utilities.checkPointInRect = function(x, y, rectX, rectY, rectW, rectH) {
    return x >= rectX && y >= rectY && x <= rectX + rectW && y <= rectY + rectH;
}

utilities.clamp = function(num, min, max){
  return num <= min ? min : num >= max ? max : num;
}

utilities.lerp = function(v0, v1, t){
  return (1 - t) * v0 + t * v1;
}
