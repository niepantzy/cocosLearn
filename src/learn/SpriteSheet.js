var SpriteLayer = cc.Layer.extend({

    ctor:function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.toonblastPlist);
        var size = cc.winSize;
        var bg = new cc.Sprite("#SavePets_Icon_Cube1.png");
        // var bg = cc.spriteFrameCache.getSpriteFrame("SavePets_Icon_Cube1.png");
        this.addChild(bg);
        bg.x = size.width/2;
        bg.y = size.height /2;
    }
});


var BatchNodeLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.toonblastPlist);
        var batchNode = new cc.SpriteBatchNode(res.toonblastPng);
        this.addChild(batchNode);
        var size = cc.winSize;
        for (var i = 0; i< 40000; i++){
            var ball = new cc.Sprite("#SavePets_Icon_Cube"+(parseInt(Math.random()*5)+1) +".png");
            // var ball = new cc.Sprite("#SavePets_Icon_Cube1.png");
            batchNode.addChild(ball,1);
            ball.x = Math.random()*size.width;
            ball.y = Math.random()*size.height;
            ball.runAction(cc.rotateBy(1,360*Math.random(),360*Math.random()).repeatForever());
        }
    }
})

var BatchNodeContrastLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.toonblastPlist);
        var size = cc.winSize;
        for(var i = 0 ; i< 40000 ;i++){
            var ball = new cc.Sprite("#SavePets_Icon_Cube"+(parseInt(Math.random()*5)+1) +".png");
            this.addChild(ball);
            ball.x = Math.random()*size.width;
            ball.y = Math.random()*size.height;
            ball.runAction(cc.rotateBy(1,360*Math.random(),360*Math.random()).repeatForever());
        }
    }
})



var ReuseSprite = cc.Sprite.extend({
    ctor:function (url) {
        this._super(url);
    },
    reuse:function (param) {
        cc.log("reuse: "+param);
    },
    unuse:function () {
        cc.log("unuse!");
    }
})

var PoolLayer  = cc.Layer.extend({
    tag : 0,
    deleteTag : 0,
    ctor:function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.toonblastPlist);
        this.deleteTag = this.tag = 0;
        this.scheduleUpdate();
    },

    update:function () {
        var size = cc.winSize;
        if(this.tag - this.deleteTag > 5000){
            for (var i = 0 ;i < 2500 ;i++){
                var ball = this.getChildByTag(this.deleteTag);
                cc.pool.putInPool(ball);
                this.removeChild(ball);
                this.deleteTag ++ ;
            }
        };

        var param = "anything";
        for (var i = 0 ;i < 2500 ;i++){
            var ball = null;
            if(cc.pool.hasObject(ReuseSprite)){
                ball = cc.pool.getFromPool(ReuseSprite,param);
            }else{
                ball = new ReuseSprite("#SavePets_Icon_Cube"+(parseInt(Math.random()*5)+1) +".png");
            }
            this.addChild(ball,1,this.tag);
            this.tag++;
            ball.x = Math.random()*size.width;
            ball.y = Math.random()*size.height;
        }
    }

})

var PoolContrastLayer  = cc.Layer.extend({
    tag : 0,
    deleteTag : 0,
    ctor:function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.toonblastPlist);
        this.deleteTag = this.tag = 0;
        this.scheduleUpdate();
    },

    update:function () {
        var size = cc.winSize;
        if(this.tag - this.deleteTag > 5000){
            for (var i = 0 ;i < 2500 ;i++){
                this.removeChildByTag(this.deleteTag,false);
                this.deleteTag ++ ;
            }
        }

        for (var i = 0 ;i < 2500 ;i++){
            var ball = new ReuseSprite("#SavePets_Icon_Cube"+(parseInt(Math.random()*5)+1) +".png");
            this.addChild(ball,1,this.tag);
            this.tag++;
            ball.x = Math.random()*size.width;
            ball.y = Math.random()*size.height;
        }
    }

})


var BakeLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.toonblastPlist);
        var size = cc.winSize;
        var layer = new cc.Layer();
        this.addChild(layer);
        for (var i = 0;i<10000;i++){
            var  node = new cc.Sprite("#SavePets_Icon_Cube"+(parseInt(Math.random()*5)+1) +".png");
            node.x = Math.random()*size.width;
            node.y = Math.random()*size.height + 200;
            layer.addChild(node);
        }
        // layer.bake();
    }
})