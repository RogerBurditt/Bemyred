class DialogManager{
  constructor(){
    this.isSleeping = false;

    this.loadedScript = [];
    this.currentBlock = 0;
    this.currentText  = "";
    this.lineReady    = true;
    this.blinkToggle  = true;

    this.dWindow = {
      x: 2,
      y: 398,
      width: 796,
      height: 200,
      bgColor: "#5A3596",
      outlineWidth: 5,
      outlineColor: "#000000",
      font: "20px Georgia",
      textColor: "#FFFFFF",
      textPaddingLeft: 10,
      textPaddingTop: 20
    };

    this.cooldown = 20;
    this.coolTick = 20;

    window.addEventListener("loadDialogue", this.loadScript.bind(this));
  }

  loop(){
    if(this.loadedScript.length > 0 &&
      this.currentBlock < this.loadedScript.length){
        this.isSleeping = false;
        this.drawWindow();
    }
    else{
      this.isSleeping = true;
    }

    // Space
    if(keyboard.keys[32]){
      if(this.currentBlock >= this.loadedScript.length){
        this.loadedScript = [];
        this.currentBlock = 0;
        this.currentText  = "";
      }
      else if(this.currentBlock < this.loadedScript.length && this.lineReady){
        this.currentBlock++;
        this.currentText = "";
        this.progressText();
      }
    }
  }

  loadScript(e){
    var script    = e.detail.script;
    var startLine = e.detail.startLine;

    this.loadedScript = script;
    this.currentBlock = startLine;
    this.currentText  = "";
    this.progressText();
  }

  progressText(){
    this.lineReady = false;
    if(this.loadedScript[this.currentBlock]){
      if(game.canvas.measureText(this.currentText).width + 20 >= this.dWindow.width){
        this.currentText += "\n";
      }
      if(this.blinkTimer){
        clearTimeout(this.blinkTimer);
      }
      var line = this.loadedScript[this.currentBlock];
      var i = 0;
      var timer = setInterval(function(){
          this.currentText += line[i];
          i++;
          if(i > line.length-1){
            this.lineReady = true;
            clearInterval(timer);
            this.blinkToggle = true;
            this.blinkPipe();
          }
          else{
            this.lineReady = false;
          }
      }.bind(this), 30);
    }
    else{
      this.lineReady = false;
    }
  }

  blinkPipe(){
    this.blinkTimer = setInterval(function(){
      if(this.blinkToggle){
        this.currentText += "•";
        this.blinkToggle = false;
      }
      else{
        this.currentText = this.currentText.substring(0, this.currentText.length - 1);
        this.blinkToggle = true;
      }
    }.bind(this), 400);
  }

  wrapText(context, text, x, y, line_width, line_height){
    var line = '';
    var paragraphs = text.split('\n');
    for (var i = 0; i < paragraphs.length; i++){
        var words = paragraphs[i].split(' ');
        for (var n = 0; n < words.length; n++){
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > line_width && n > 0){
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += line_height;
            }
            else { line = testLine; }
        }
        context.fillText(line, x, y);
        y += line_height;
        line = '';
    }
  }

  drawWindow(){
    game.canvas.strokeStyle = this.dWindow.outlineColor;
    game.canvas.lineWidth = this.dWindow.outlineWidth;
    game.canvas.strokeRect(this.dWindow.x, this.dWindow.y, this.dWindow.width, this.dWindow.height);

    game.canvas.fillStyle = this.dWindow.bgColor;
    game.canvas.fillRect(this.dWindow.x, this.dWindow.y, this.dWindow.width, this.dWindow.height);

    game.canvas.font = this.dWindow.font;
    game.canvas.fillStyle = this.dWindow.textColor;

    this.wrapText(game.canvas, this.currentText,
    this.dWindow.x + this.dWindow.textPaddingLeft,
    this.dWindow.y + this.dWindow.textPaddingTop,
    this.dWindow.width, 30);
  }
}
