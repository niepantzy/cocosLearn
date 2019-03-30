var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});
var GameLayer = cc.Layer.extend({
    mapPanel : null,
    ui:null,
    score:0,
    level:1,
    steps:0,
    limitStep:0,
    targetScore:0,
    moving :false,
    over:false,
    ctor:function () {
        this._super();
        var size = cc.director.getWinSize();
        var bg = new cc.Sprite(res.bg);
        this.addChild(bg);
        bg.x = size.width/2;
        bg.y = size.height/2;
        bg.setScale(0.5,0.5);
        bg.setScale(720/bg.width,1280/bg.height);
        cc.log("["+size.width + ","+size.height+"]["+bg.width + ","+bg.height+"]" )

        var clipingPanel  = new cc.ClippingNode();

        this.mapPanel = new cc.Layer();
        this.mapPanel.x = (size.width - Constant.CANDY_WIDTH * Constant.MAP_SIZE)/2;
        this.mapPanel.y = (size.height- Constant.CANDY_WIDTH * Constant.MAP_SIZE)/2;
        clipingPanel.addChild(this.mapPanel,1);

        var stencil = new cc.DrawNode();
        // stencil.drawRect(cc.p(this.mapPanel.x,this.mapPanel.y),cc.p(this.mapPanel.x + 100,this.mapPanel.y + 100),cc.color(255,255,255),10,cc.color(255,255,255));
        stencil.drawRect(cc.p(this.mapPanel.x,this.mapPanel.y),cc.p(this.mapPanel.x + Constant.CANDY_WIDTH*Constant.MAP_SIZE,this.mapPanel.y + Constant.CANDY_WIDTH*Constant.MAP_SIZE),cc.color(255,255,255),10,cc.color(255,255,255));
        clipingPanel.stencil = stencil;
        clipingPanel.setColor(cc.color(255,255,255));
        this.addChild(clipingPanel,2);
        this._init();

        if("touches" in cc.sys.capabilities){
            cc.eventManager.addListener({
                event:cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan:this._onTouchBegan.bind(this)
            },this.mapPanel);
        }else{
            cc.eventManager.addListener({
                event:cc.EventListener.MOUSE,
                onMouseDown:this._onMouseDown.bind(this)
            },this.mapPanel);
        }
    },
    _init:function () {
        this.steps = 0;
        this.level = Storage.getCurrentLevel();
        this.score = Storage.getCurrentScore();
        this.limitStep = Constant.levels[this.level].limitStep;
        this.targetScore = Constant.levels[this.level].targetScore;

        this.map = [];
        for (var i = 0;i < Constant.MAP_SIZE;i++){
            var col = [];
            for(var j = 0;j<Constant.MAP_SIZE;j++){
                var candy = Candy.createRandomType(i,j);
                this.mapPanel.addChild(candy);
                candy.x = i * Constant.CANDY_WIDTH + Constant.CANDY_WIDTH/2;
                candy.y = j * Constant.CANDY_WIDTH + Constant.CANDY_WIDTH/2;
                col.push(candy);
            }

            this.map.push(col);
        }
        this.ui = new GameUI(this);
        this.addChild(this.ui,3);
    },
    
    _onTouchBegan:function (touch,event) {
        var col = Math.floor((touch.getLocation().x - this.mapPanel.x)/Constant.CANDY_WIDTH);
        var row = Math.floor((touch.getLocation().y - this.mapPanel.y)/Constant.CANDY_WIDTH);
        this._popCandy(col,row);
    },
    
    _onMouseDown:function (event) {
        var col = Math.floor((event.getLocationX() - this.mapPanel.x)/Constant.CANDY_WIDTH);
        var row = Math.floor((event.getLocationY() - this.mapPanel.y)/Constant.CANDY_WIDTH);
        this._popCandy(col,row);
    },

    _popCandy:function (col,row) {
        if(this.over||this.moving||!this.map[col]||!this.map[col][row]){
            return;
        }
        var joinCandys = [this.map[col][row]];
        var index = 0;
        var pushInfoCandy = function (element) {
            if(joinCandys.indexOf(element) < 0){
                joinCandys.push(element);
            }
        };
        while(index < joinCandys.length){
            var candy = joinCandys[index];
            if(this._checkCandyExist(candy.col - 1,candy.row) && this.map[candy.col - 1][candy.row].type == candy.type){
                pushInfoCandy(this.map[candy.col - 1][candy.row]);
            }
            if(this._checkCandyExist(candy.col + 1,candy.row) && this.map[candy.col + 1][candy.row].type == candy.type){
                pushInfoCandy(this.map[candy.col + 1][candy.row]);
            }
            if(this._checkCandyExist(candy.col,candy.row-1) && this.map[candy.col][candy.row -1].type == candy.type){
                pushInfoCandy(this.map[candy.col][candy.row -1]);
            }
            if(this._checkCandyExist(candy.col,candy.row+1) && this.map[candy.col][candy.row +1].type == candy.type){
                pushInfoCandy(this.map[candy.col][candy.row +1]);
            }
            index ++ ;
        }

        if(joinCandys.length <= 1){
            return;
        }

        this.steps ++;
        this.moving = true;
        for (var i = 0;i < joinCandys.length ;i++){
            var candy = joinCandys[i];
            this.mapPanel.removeChild(candy);
            this.map[candy.col][candy.row] = null;
        }
        cc.log( "*************** before  score:"+ this.score + " count: "+ joinCandys.length)
        this.score += joinCandys.length * joinCandys.length;
        cc.log("****************score:"+ this.score + " count: "+ joinCandys.length)
        this._generateNewCandy();
        this._checkSuccessOrFail();
    },

    _checkCandyExist:function (col,row) {
         if(this.map[col]&&this.map[col][row]){
             return true;
         }
         return false;
    },

    _generateNewCandy:function () {

        var maxTime = 0;
        for (var i = 0 ; i < Constant.MAP_SIZE ;i++){
            var missCount= 0;
            for(var j = 0; j < this.map[i].length;j++){

                var candy = this.map[i][j];
                if(!candy){
                    var candy = Candy.createRandomType(i,Constant.MAP_SIZE + missCount);
                    this.mapPanel.addChild(candy);
                    candy.x = candy.col * Constant.CANDY_WIDTH +  Constant.CANDY_WIDTH/2;
                    candy.y = candy.row * Constant.CANDY_WIDTH +  Constant.CANDY_WIDTH/2;

                    this.map[i][candy.row]=candy;
                    missCount ++;
                }else{
                    var fallLengh = missCount;
                    if (fallLengh > 0){
                        var duration = Math.sqrt(2* fallLengh /Constant.FALL_ACCELERATION);
                        if(duration > maxTime){
                            maxTime = duration;
                        }
                        var move = cc.moveTo(duration,candy.x,candy.y - Constant.CANDY_WIDTH * fallLengh).easing(cc.easeIn(2));
                        candy.runAction(move);
                        candy.row -= fallLengh;
                        this.map[i][j]= null;
                        this.map[i][candy.row]= candy;
                    }
                }
            }
            for(var j = this.map[i].length;j >= Constant.MAP_SIZE;j--){
                this.map[i].splice(j,1);
            }
        }
        this.scheduleOnce(this._finishCandyFalls.bind(this),maxTime);
    },
    _checkSuccessOrFail:function () {
        if(this.score > this.targetScore){
            this.over = true;
            this.score += (this.limitStep - this.steps) * 30;
            var newLevel = this.level + 1;
            if (!Constant.levels[newLevel]) {
                Storage.setCurrentLevel(0);
                Storage.setCurrentScore(0);
                this.ui.showSuccessAll();
            }else{
                Storage.setCurrentLevel(newLevel);
                Storage.setCurrentScore(this.score);
                this.ui.showSuccess();
            }
            this.scheduleOnce(function () {
                cc.director.runScene(new GameScene());
            },3);
        }else if(this.steps >= this.limitStep){
            this.over = true;
            this.ui.showFail();
            this.scheduleOnce(function () {
                cc.director.runScene(new GameScene());
            },3);
            Storage.setCurrentLevel(0);
            Storage.setCurrentScore(0);
        }
    },
    _finishCandyFalls:function () {
        this.moving = false;
        cc.log("_finishCandyFalls :" + this.moving);
    }
})