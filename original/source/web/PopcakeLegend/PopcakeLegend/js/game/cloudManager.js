/**
  *  cloudManager.js
  *  Handles random clouds in 2D
  *  Author: Ruell Magpayo <ruellm@yahoo.com>
  *  Created: April 25, 2015
  * 
*/

function CloudManager()
{
    this.CLOUD_TYPES = 2;
    this.MAX_CLOUD_COUNT = 8;
    this.CLOUD_BORDER_Y = DEFAULT_WINDOW_HEIGHT / 2 + 200;
    this.CLOUD_SLOW_SPEED = 10;
    this.CLOUD_FAST_SPEED = 30;

    this.imageList = null;
}

CloudManager.prototype.InitClouds = function () {
    this.cloud_list = new Array();
    
    var randbg_count = this.MAX_CLOUD_COUNT;
    for (var i = 0; i < randbg_count; i++) {
        this.SpawnCloud(Math.floor(Math.random() * this.imageList.length));
    }
}

CloudManager.prototype.SpawnCloud = function (type, re) {
    var x = Math.floor(Math.random() * (DEFAULT_WINDOW_WIDTH + 200));
    var y = Math.floor(Math.random() * (this.CLOUD_BORDER_Y));
    var cloudImg = new ImageObject();

    if (re) {
        x = DEFAULT_WINDOW_WIDTH;
    }

    cloudImg._X = x;
    cloudImg._Y = y;
    cloudImg.speed = Math.floor(Math.random() * (this.CLOUD_FAST_SPEED)) + this.CLOUD_SLOW_SPEED;
    cloudImg.Load(this.imageList[type]);
    this.cloud_list.push(cloudImg);   
}


CloudManager.prototype.Update = function (elapsed) {
    for (var i = 0; i < this.cloud_list.length; i++) {
        this.cloud_list[i]._X -= /*CLOUD_FG_SPEED*/this.cloud_list[i].speed * elapsed;

        if (this.cloud_list[i]._X + this.cloud_list[i]._image.width < 0) {
            this.cloud_list.splice(i, 1);
        }
    }

    var diffhj = this.MAX_CLOUD_COUNT - this.cloud_list.length;
    while (diffhj-- > 0) {
        this.SpawnCloud(Math.floor(Math.random() * this.imageList.length));
    }

}

CloudManager.prototype.Draw = function (gfx)
{
    for (var i = 0; i < this.cloud_list.length; i++) {
        this.cloud_list[i].Draw(gfx);
    }

}

