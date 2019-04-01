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
        animation.setDelayPerUnit(1/14);
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


var PartuckeLayer = cc.Layer.extend({
    ctor:function () {

        this._super();
        var particleSystem = new cc.ParticleSystem(100);
        this.addChild(particleSystem);
        particleSystem.texture = cc.textureCache.addImage(res.particle);
         var size = cc.winSize;
         particleSystem.x = size.width / 2;
         particleSystem.y = size.height / 2;
         particleSystem.posVar = cc.p(0,0);
          particleSystem.duration = cc.ParticleSystem.DURATION_INFINITY;
          particleSystem.emitterMode = cc.ParticleSystem.MODE_RADIUS;
        particleSystem.startRadius = 0;
        particleSystem.startRadiusVar = 30;
        particleSystem.endRadius = 240;
        particleSystem.endColorVar = 30;

        particleSystem.rotatePerS = 180;
        particleSystem.rotatePerSVar = 0;

        particleSystem.angle = 90;
        particleSystem.angleVar = 0;

        particleSystem.life = 10;
        particleSystem.lifeVar = 0;

        particleSystem.startSpin = 0;
        particleSystem.startRadiusVar = 0;
        particleSystem.endSpin = 0;
        particleSystem.endSpinVar = 0;

        particleSystem.startColor = cc.color(128,128,128,255);
        particleSystem.startColorVar = cc.color(128,128,128,255);
        particleSystem.endColor = cc.color(128,128,128,50);
        particleSystem.endColorVar  =cc.color(26,26,26,50);


        particleSystem.startSize = 32;
        particleSystem.startSizeVar = 0;

        particleSystem.endSize = cc.ParticleSystem.START_SIZE_EQUAL_TO_END_SIZE;
        particleSystem.emissionRate = particleSystem.totalParticles / particleSystem.life;

        var p1 = new cc.ParticleFireworks();
        p1.texture = cc.textureCache.addImage(res.particle);
        this.addChild(p1);
        p1.x = 100;
        p1.y = 100;

        var p2 = new cc.ParticleFire();
        p2.texture = cc.textureCache.addImage(res.particle);
        this.addChild(p2);
        p2.x = 300;
        p2.y = 100;

        var p3 = new cc.ParticleSun();
        p3.texture = cc.textureCache.addImage(res.particle);
        this.addChild(p3);
        p3.scale = 2;
        p3.x = 500;
        p3.y = 100;

        var p4 = new cc.ParticleGalaxy();
        p4.texture = cc.textureCache.addImage(res.particle);
        this.addChild(p4);
        p4.x =600;
        p4.y = 100;



        var p5 = new cc.ParticleFlower();
        p5.texture = cc.textureCache.addImage(res.particle);
        this.addChild(p5);
        p5.x =100;
        p5.y =900;

        var p6 = new cc.ParticleSnow();
        p6.texture = cc.textureCache.addImage(res.particle);
        this.addChild(p6);


        var p7 = new cc.ParticleSystem(res.particlePlist);
        this.addChild(p7);
        p7.duration = 100;
        p7.x = 500;
        p7.y = 900;

        setTimeout(function () {
           p7.stopSystem();
           this.removeChild(p7);
        },3000)

    }
})