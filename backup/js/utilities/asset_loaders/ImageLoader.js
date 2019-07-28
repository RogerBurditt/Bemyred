class ImageLoader{
  constructor(){
    this.successCount = 0;
    this.failCount   = 0;

    this.images = [];

    this.firstLoad =
    [
      { src: "../bemyred5/assets/frontend/images/misc/ACTORID-0.png",  id: 0 }
    ];
  }

  load(queue, id){
    for(var i = 0; i < queue.length; i++){
      var img  = new Image();
      img.src  = queue[i].src;
      img.id   = queue[i].id;
      var that = this;

      img.addEventListener("load", function(){
        that.successCount += 1;
        that.images.push(this);

        if(that.successCount + that.failCount >= queue.length){
          that.imageLoaded(id);
        }

      }, false);

      img.addEventListener("error", function(){
        that.failCount += 1;

        if(that.successCount + that.failCount >= queue.length){
          console.log("Image load failed.");//game.eventFactory.imageLoadComplete(id);
        }

      }, false);
    }
  }

  add(src, id){
    this.queue.push({src, id});
  }

  getImage(id){
    for(var i in this.images){
      if(id == this.images[i].id){
        return this.images[i];
      }
    }
  }

  imageLoaded(id){
    window.dispatchEvent(new CustomEvent("imageLoaded", {detail: { id:id }}));
  }
}
