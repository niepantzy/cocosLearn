var GameSceneUI= cc.Layer.extend({
    _lifeText : null,
    _distanceText : null,
    _scoreText :null,

    ctor:function () {

        this._super();
        var size = cc.winSize;
        var lifeLabel = new cc.LabelBMFont("L I V E S",res.fnt);
        this.addChild(lifeLabel);
        lifeLabel.x = 360;
        lifeLabel.y = size.height - 25;
        this._lifeText = new cc.LabelBMFont("0",res.fnt);
        this.addChild(this._lifeText);
        this._lifeText.x = 360;
        this._lifeText.y = size.height -60;

        var distanceLabel = new cc.LabelBMFont("D I S T A N C E",res.fnt);
        this.addChild(distanceLabel);
        distanceLabel.x = 680;
        distanceLabel.y = size.height - 25;
        this._distanceText = new cc.LabelBMFont("0",res.fnt);
        this.addChild(this._distanceText);
        this._distanceText.x = 680;
        this._distanceText.y = size.height -60;

        var scoreLabel = new cc.LabelBMFont("S C O R E",res.fnt);
        this.addChild(scoreLabel);
        scoreLabel.x = 915;
        scoreLabel.y = size.height - 25;
        this._scoreText = new cc.LabelBMFont("0",res.fnt);
        this.addChild(this._scoreText);
        this._scoreText.x = 915;
        this._scoreText.y = size.height -60;

        var pasueButton  = new cc.MenuItemImage("#pauseButton.png","#pauseButton.png",this._pauseResume);
        var  soundButton = new SoundButton();
        var menu = new cc.Menu(soundButton,pasueButton);
        menu.alignItemsHorizontallyWithPadding(30);
        menu.x = 80;
        menu.y = size.height - 45;
        this.addChild(menu);


    },
    _pauseResume:function () {
        if(cc.director.isPaused()){
            cc.director.resume();
        }else{
            cc.director.pause();
        }
    },
    update:function () {
        this._lifeText.setString(Game.user.lives.toString());
        this._distanceText.setString(parseInt(Game.user.distance).toString());
        this._scoreText.setString(Game.user.score.toString());
    }
})