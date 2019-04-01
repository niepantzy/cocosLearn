var ParallaxLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var bg = new cc.ParallaxNode();
        var bg1 = new cc.Sprite(res.background);
        var bg2 = new cc.Sprite(res.background1);
        var bg3 = new cc.Sprite(res.background2);
        var bg4 = new cc.Sprite(res.background3);
        bg.addChild(bg1,1,cc.p(0.1,0.1),cc.p(bg1.width/2,bg1.height/2));
        bg.addChild(bg2,2,cc.p(0.3,0.3),cc.p(bg2.width/2,bg2.height/2));
        bg.addChild(bg3,3,cc.p(0.5,0.5),cc.p(bg3.width/2,bg3.height/2));
        bg.addChild(bg4,4,cc.p(0.8,0.8),cc.p(bg4.width/2,bg4.height/2));
        var action = cc.moveBy(1,-200,0);
        bg.runAction(cc.sequence(action,action.clone().reverse()).repeatForever());
        this.addChild(bg);
    }
})


var UnlimitedParallaxLayer = cc.Layer.extend({
    bg1 :null,
    bg2 :null,
    bg3 :null,
    bg4 :null,

    speeed : 5,
    dir:1,
    ctor:function () {
        this._super();
        this.scheduleUpdate();


        var buildParallaxBackGround = function (texture) {
            var layer = new cc.Layer();
            var bg = new cc.Sprite(texture);
            bg.x = bg.width/2;
            bg.y = bg.height/2;
            layer.addChild(bg);

            var bg2 = new cc.Sprite(texture);
            bg2.x = bg2.width/2+bg2.width;
            bg2.y = bg2.height/2;
            layer.addChild(bg2);
            return layer;
        }

        this.bg1 = buildParallaxBackGround(res.background);
        this.addChild(this.bg1);
        this.bg2 = buildParallaxBackGround(res.background1);
        this.addChild(this.bg2);
        this.bg3 = buildParallaxBackGround(res.background2);
        this.addChild(this.bg3);
        this.bg4 = buildParallaxBackGround(res.background3);
        this.addChild(this.bg4);
    },


    // update:function () {
    //     var size = cc.winSize;
    //     if (this.bg4.x <= 0){
    //        this.dir = 1;
    //     }
    //     // if (this.bg4.x >=  this.bg1.width){
    //     //     this.dir = -1;
    //     // }
    //     this.bg1.x = this.bg1.x  +this.dir * Math.ceil(this.speeed * 0.1);
    //     this.bg2.x = this.bg2.x  +this.dir * Math.ceil(this.speeed * 0.3);
    //     this.bg3.x = this.bg3.x  +this.dir * Math.ceil(this.speeed * 0.5);
    //     this.bg4.x=this.bg4.x  +this.dir *  Math.ceil(this.speeed * 1);
    // },

    update:function () {
        var size = cc.winSize;
        this.bg1.x -= Math.ceil(this.speeed * 0.1);
        if(this.bg1.x < -parseInt(size.width)){
            this.bg1.x = 0;
        }
        this.bg2.x -= Math.ceil(this.speeed * 0.3);
        if(this.bg2.x < -parseInt(size.width)){
            this.bg2.x = 0;
        }
        this.bg3.x -= Math.ceil(this.speeed * 0.5);
        if(this.bg3.x < -parseInt(size.width)){
            this.bg3.x = 0;
        }
        this.bg4.x -= Math.ceil(this.speeed * 1);
        if(this.bg4.x < -parseInt(size.width)){
            this.bg4.x = 0;
        }
    }
})