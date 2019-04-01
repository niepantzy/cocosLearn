var GameOverUI = cc.Layer.extend({
    ctor:function (gameScene) {

        this._super();
        this.gameScene = gameScene;
        var  size = cc.winSize;
        var  bg = new cc.LayerColor(cc.color(0,0,0,200),size.width,size.height);
        this.addChild(bg);

        var fnt = res.fnt;
        var title = new cc.LabelBMFont("HERO WAS KILLED",fnt);
        this.addChild(title);
        title.setColor(cc.color(243,231,95));
        title.x = size.width/2;
        title.y = size.height - 120;

        this._distance = new cc.LabelBMFont("DISTANCE TRAVELLED:  0000000",fnt);
        this.addChild(this._distance);
        this._distance.x = size.width/2;
        this._distance.y = size.height - 220;

        this._score = new cc.LabelBMFont("SCORE:  0000000",fnt);
        this.addChild( this._score );
        this._score .x = size.width/2;
        this._score .y = size.height - 120;

        var replayBtn = new cc.MenuItemImage("#gameOver_playAgainButton.png","#gameOver_playAgainButton.png",this._replay.bind(this));
        var aboutBtn = new cc.MenuItemImage("#gameOver_aboutButton.png","#gameOver_aboutButton.png",this._about);
        var mainBtn = new cc.MenuItemImage("#gameOver_mainButton.png","#gameOver_mainButton.png",this._return);
        var  menu = new cc.Menu(replayBtn,aboutBtn,mainBtn);
        menu.alignItemsVertically();
        this.addChild(menu);
        menu.y = size.height/2 - 100;

    },
    init:function () {
        this._distance.setString("DISTANCE TRAVELLED:" + parseInt(Game.user.distance));
        this._score.setString("SCORE:" + parseInt(Game.user.score));
    },

    _replay:function () {
        this.gameScene.init();
    },

    _about:function () {
        cc.director.runScene(new AbountScene());
    },
    _return:function () {
        cc.director.runScene(new MenuScene());
    }
})