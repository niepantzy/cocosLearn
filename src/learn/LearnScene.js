var LearnScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        // var layer = new SpriteLayer();
        // this.addChild(layer);

        // var layer = new BatchNodeLayer();
        // this.addChild(layer);

        // var layer = new BatchNodeContrastLayer();
        // this.addChild(layer);

        // var layer = new PoolLayer();
        // this.addChild(layer);

        // var layer = new PoolContrastLayer();
        // this.addChild(layer);
        //
        // var layer = new BakeLayer();
        // this.addChild(layer);

        // var layer = new FrameAnimationLayer();
        // this.addChild(layer);

        var layer = new ArmatureLayer();
        this.addChild(layer);



    }
})