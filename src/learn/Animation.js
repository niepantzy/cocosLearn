var FrameAnimationLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        var size = cc.winSize;
        var  man = new cc.Sprite();
        // cc.spriteFrameCache.addSpriteFrames(res.toonblastPlist);
        var animation = new cc.Animation();

        for (var i = 0; i < actions.length; i++){
            animation.addSpriteFrameWithFile(actions[i]);
        }
        animation.setDelayPerUnit(1/5);
        animation.setLoops(500);
        var action = cc.animate(animation);
        man.runAction(action);
        this.addChild(man);
        man.x = size.width/2;
        man.y = size.height/2;
    }
})


var ArmatureLayer = cc.Layer.extend({
    _armature : null,
    _direction : null,


    onEnter:function () {
      this._super();
      var size = cc.winSize;
      ccs.armatureDataManager.addArmatureFileInfo(res.cowPlayerSpine);
      this._armature = new ccs.Armature("DemoPlayer");
      this._armature.getAnimation().play("walk_fire");
      this._armature.scaleX = -0.25;
      this._armature.scaleY = 0.25;
      this._armature.x = size.width/2 - 150;
      this._armature.y = size.height/2;
      this._armature.getAnimation().setMovementEventCallFunc(this.animationEventHandler,this);
      this.addChild(this._armature);
      this._direction = 1;
    },

    animationEventHandler :function (armature,movementType,movementID) {

        if(movementType == ccs.MovementEventType.loopComplete){
            if(movementID == "walk_fire"){
                var moveBy = cc.moveBy(2,cc.p(300*this._direction,0));
                this._armature.stopAction();
                this._armature.runAction(cc.sequence(moveBy,cc.callFunc(this.callback,this)));
                this._armature.getAnimation().play("walk");
                this._direction *= -1;
            }
        }
    },
    callback:function () {
        this._armature.runAction(cc.scaleTo(0.1,0.25*this._direction * -1,0.25));
        this._armature.getAnimation().play("walk_fire",10);
    }
});