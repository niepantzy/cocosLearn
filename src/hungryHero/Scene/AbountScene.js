var AbountScene = cc.Scene.extend({
    ctor:function () {
        this._super();
        var layer = new cc.Layer();
        this.addChild(layer);

        var size = cc.winSize;
        var bgWelcome = new cc.Sprite(res.bgWelcome);
        bgWelcome.x = size.width/2;
        bgWelcome.y = size.height /2;
        layer.addChild(bgWelcome);


        var aboutText = "这是我的小游戏，我的名字叫niepan\n\n"+"这是我自己玩cocos-js弄的一个例子\n\n"+"希望你能喜欢！！！";
        var helloLabel = new cc.LabelTTF(aboutText,"arial",18);
        helloLabel.x = size.width/2;
        helloLabel.y = size.height/2+80;
        layer.addChild(helloLabel);
        var backButton = new cc.MenuItemImage("#about_backButton.png","#about_backButton.png",this._back);
        backButton.x = size.width/2 + 150;
        backButton.y = size.height/2-70;

        var  soundButton = new SoundButton();
        soundButton.x = 45;
        soundButton.y = size.height - 45;

        var menu = new cc.Menu(backButton,soundButton);
        menu.x = menu.y = 0;
        layer.addChild(menu);
    },



    _back:function () {
        Sound.playEat();
        cc.director.runScene(new MenuScene());
    }
})